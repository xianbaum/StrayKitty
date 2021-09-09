import { Direction } from "./Direction";
import { StrayKittyState } from "./StrayKittyState";
import { KittyType } from "./KittyType";
import { ActionType } from "./actions/ActionType";
import { StandingAction } from "./actions/StandingAction";
import { FallingAction } from "./actions/FallingAction";
import { GrabbedAction } from "./actions/GrabbedAction";

export class StrayKitty {

    private state: StrayKittyState
    id: number;

    private mouseXOffset: number;
    private mouseYOffset: number;

    private canvas: HTMLCanvasElement;
    private static _id: number = 0;
    private static get incrementalId(): number {
        return StrayKitty._id++;
    }

    private static image: HTMLImageElement = new Image();
    private static isInitialized: boolean = false;
    private static initialize() {
        if (StrayKitty.isInitialized) return;
        StrayKitty.isInitialized = true;
        StrayKitty.image.onerror = (e) => {
            console.error(StrayKitty.image.src);
            console.error(JSON.stringify(e));
        };
    }

    private checkBounds() {
        if (this.state.x < 0) {
            this.state.x = 0;
            if (this.state.action.type != ActionType.Grabbed) {
                this.flip();
            }
            this.state.xVector = -this.state.xVector;
        }
        else if (this.state.x > window.innerWidth - 32) {
            this.state.x = window.innerWidth - 32;
            if (this.state.action.type != ActionType.Grabbed) {
                this.flip();
            }
            this.state.xVector = -this.state.xVector;
        }
        if (this.state.y < 0) {
            this.state.y = 0;
        }
        else if (this.state.y > window.innerHeight - 32) {
            this.state.y = window.innerHeight - 32
        }
    }

    private move(dt: number) {
        this.state.x += this.state.xVector * (dt / 10);
        this.state.y += this.state.yVector * (dt / 10);
    }

    private lastDir: Direction = Direction.Left;
    private lastFrame = -1;
    private lastX = -9999;
    private lastY = -9999;
    private draw() {
        if (!StrayKitty.imageIsLoaded) return;
        let context = this.canvas.getContext("2d");
        if (context === null) {
            throw new ReferenceError("context is null!");
        }
        let transform = context.getTransform();

        if (this.state.dir != this.lastDir) {
            context.translate(this.canvas.width, 0);
            context.scale(-1, 1);
            this.lastDir = this.state.dir;
        }

        if (this.lastX != this.state.x ||
            this.lastY != this.state.y) {
            this.canvas.style.transform =
                "translate(" + this.state.x + "px," + this.state.y + "px)";
            this.lastY = this.state.y;
            this.lastX = this.state.x;
        }

        let frame =
            this.state.action.frames[
            Math.floor(this.state.animTimer / 250)
            % this.state.action.frames.length];

        if (this.lastFrame !== frame) {
            context.clearRect(0, 0, 32, 32);
            context.drawImage(
                StrayKitty.image,
                32 * frame,
                32 * this.state.type,
                32,
                32,
                0,
                0,
                32,
                32);
            this.lastFrame = frame;
        }
    }

    constructor(type?: KittyType) {
        StrayKitty.initialize();
        this.id = StrayKitty.incrementalId;
        this.canvas = document.createElement("canvas");
        this.canvas.id = 'kittycanvas' + this.id;
        this.canvas.style.position = "fixed"
        this.canvas.style.top = "0px";
        this.canvas.style.left = "0px";
        this.canvas.style.zIndex = "2147400000";
        this.canvas.width = 32;
        this.canvas.height = 32;
        this.state = new StrayKittyState();
        this.canvas.addEventListener("mousedown", (event) => {
            this.mouseXOffset = this.state.x - event.clientX;
            this.mouseYOffset = this.state.y - event.clientY;
            this.state.action = new GrabbedAction();
        });
        document.body.appendChild(this.canvas);
        this.state.dir = StrayKittyState.randomDir();
        this.state.type =
            typeof type === "number" ? type : Math.floor(Math.random() * 3);
        this.state.frame = //Setting all to 0
            this.state.animMax =
            this.state.y =
            this.state.xVector =
            this.state.yVector =
            this.state.animTimer = 0;
        this.state.x = Math.floor(Math.random() * window.innerWidth - 32);
        this.state.action = new StandingAction();
        this.canvas = <HTMLCanvasElement>document.getElementById("kittycanvas" + this.id);
    }

    update(dt: number) {
        this.state.animTimer += dt
        this.state.action.do(this.state, dt);
        this.move(dt);
        this.checkBounds()
        this.draw();
    }

    flip() {
        if (this.state.dir === Direction.Left) {
            this.state.dir = Direction.Right;
        } else {
            this.state.dir = Direction.Left;
        }
    }

    updateGrabbed(e: MouseEvent) {
        this.state.x = e.clientX + this.mouseXOffset;
        this.state.y = e.clientY + this.mouseYOffset;
    }

    release() {
        this.state.action = new FallingAction();
    }

    get isBeingGrabbed() {
        return this.state.action.type === ActionType.Grabbed;
    }

    static setImageSrc(value: string) {
        StrayKitty.image.src = value;
    }

    static get imageIsLoaded() {
        return StrayKitty.image.complete && StrayKitty.image.naturalHeight !== 0;
    }

    dispose() {
        document.body.removeChild(this.canvas);
    }
}
