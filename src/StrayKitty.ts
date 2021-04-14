import { Direction } from "./Direction";
import { KittyStates } from "./KittyStates";
import { KittyType } from "./KittyType";

export class StrayKitty {
    private id: number;
    private intervalID: number;
    private x: number;
    private y: number;
    private state: KittyStates;
    private type: number;
    private animMax: number;
    private frame: number;
    private xVector: number;
    private yVector: number;
    private animTimer: number;
    private get animTimerOverdue() {
        return this.animTimer > this.animMax;
    }
    private canvas: HTMLCanvasElement;
    private static _id: number = 0;
    private static get incrementalId(): number {
        return StrayKitty._id++;
    }
    private _dir: Direction;
    private get direction(): Direction {
        return this._dir;
    }
    private set direction(value) {
        if (this._dir !== value) {
            let context = this.canvas.getContext("2d");
            if (context === null) {
                throw new ReferenceError("Context is null :c");
            }
            if (this._dir !== undefined ||
                this._dir === undefined &&
                value === Direction.Right) {
                context.translate(32, 0);
                context.scale(-1, 1);
            }
        }
        this._dir = value;
    }
    private mouseXOffset: number;
    private mouseYOffset: number;
    private static randomDir() {
        return Math.random() > 0.5 ? Direction.Left : Direction.Right;
    }
    private static randomState(): KittyStates {
        return <KittyStates>Math.floor(Math.random() * 8)
    }
    private static image: HTMLImageElement = new Image();
    private static isInitialized: boolean = false;
    private static initialize() {
        if(StrayKitty.isInitialized) return;
        StrayKitty.isInitialized = true;
        StrayKitty.image.onerror = (e) => {
            console.error(StrayKitty.image.src);
            console.error(JSON.stringify(e));
        };
    } 
    private static readonly frames = [
        [0], //Standing
        [0, 1],//Walking
        [3, 2],//Running
        [4],//Yawning
        [5, 6],//Sleeping
        [7],//Laying
        [8],//Sitting
        [9, 10],//Licking
        [1, 2, 3],//Grabbed
        [2, 3] // Falling
    ]
    private updateState(fps: number) {
        //Universal for all states except grabbing
        if (!this.isBeingGrabbed &&
            this.y < window.innerHeight - 32) {
            this.state = KittyStates.Falling;
        }
        switch (this.state) {
            case KittyStates.Falling:
                this.updateFalling(fps);
                break;
            case KittyStates.Laying:
                this.updateLaying();
                break;
            case KittyStates.Licking:
                this.updateLicking();
                break;
            case KittyStates.Running:
                this.updateRunning();
                break;
            case KittyStates.Sitting:
                this.updateSitting();
                break;
            case KittyStates.Sleeping:
                this.updateSleeping();
                break;
            case KittyStates.Standing:
                this.updateStanding();
                break;
            case KittyStates.Walking:
                this.updateWalking();
                break;
            case KittyStates.Yawning:
                this.updateYawning();
                break;
        }
    }
    private updateSitting() {
        this.checkAndChangeState(() =>
            Math.random() > 0.4 ? KittyStates.Yawning
                : KittyStates.Standing
        );
    }
    private updateLaying() {
        this.checkAndChangeState(() =>
            Math.random() > 0.33 ? (
                Math.random() > 0.5 ? KittyStates.Running
                    : KittyStates.Sleeping)
                : KittyStates.Sitting
        );
    }
    private updateLicking() {
        this.checkAndChangeState(() =>
            Math.random() > 0.33 ? (
                Math.random() > 0.5 ? KittyStates.Laying
                    : KittyStates.Sleeping)
                : KittyStates.Sitting
        );
    }
    private updateYawning() {
        this.checkAndChangeState(() =>
            Math.random() > 0.33 ? (
                Math.random() > 0.5 ? KittyStates.Walking
                    : KittyStates.Licking)
                : KittyStates.Laying
        );
    }
    private updateSleeping() {
        this.checkAndChangeState(() =>
            Math.random() > 0.4 ?
                KittyStates.Sitting
                : KittyStates.Standing
        );
    }
    private updateStanding() {
        this.checkAndChangeState(() => StrayKitty.randomState());
    }
    private updateWalking() {
        this.checkAndChangeState(() => StrayKitty.randomState());
        this.xVector = this.direction == Direction.Right ? 1 : -1;
    }
    private updateRunning() {
        this.checkAndChangeState(() => StrayKitty.randomState());
        this.xVector = this.direction == Direction.Right ? 2 : -2;
    }
    private updateFalling(fps: number) {
        if (this.y < window.innerHeight - 32) {
            this.yVector = this.yVector + 2 * (1 / fps)
        } else {
            if (Math.abs(this.yVector) < 0.1) {
                this.y = window.innerHeight - 32;
                this.state = KittyStates.Standing;
            }
            this.yVector *= -0.5;
        }
    }
    private checkAndChangeState(newStatecalculator: () => KittyStates) {
        if (this.animTimerOverdue) {
            this.animMax = Math.floor(Math.random() * 30) + 10;
            this.animTimer = 0;
            this.state = newStatecalculator();
            this.direction = StrayKitty.randomDir();
        }
    }
    private checkBounds() {
        if (this.x < 0) {
            this.x = 0;
            if (!this.isBeingGrabbed) {
                this.flip();
            }
            this.xVector = -this.xVector;
        }
        else if (this.x > window.innerWidth - 32) {
            this.x = window.innerWidth - 32;
            if (!this.isBeingGrabbed) {
                this.flip();
            }
            this.xVector = -this.xVector;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y > window.innerHeight - 32) {
            this.y = window.innerHeight - 32
        }
    }
    private move(fps: number) {
        if (this.state == KittyStates.Grabbed ||
            this.state == KittyStates.Standing ||
            this.state == KittyStates.Sleeping ||
            this.state == KittyStates.Licking ||
            this.state == KittyStates.Sitting ||
            this.state == KittyStates.Laying) {
            this.xVector = 0;
            this.yVector = 0;
        }
        this.x += this.xVector * (100 / fps);
        this.y += this.yVector * (100 / fps);
    }
    private draw() {
        if(!StrayKitty.imageIsLoaded) return;
        this.canvas.style.top = "" + this.y + "px";
        this.canvas.style.left = "" + this.x + "px";
        let context = this.canvas.getContext("2d");
        if (context === null) {
            throw new ReferenceError("context is null!");
        }
        context.clearRect(0, 0, 32, 32);
        context.drawImage(StrayKitty.image,
            32 *
            (StrayKitty.frames[this.state]
            [Math.floor(this.animTimer / 2) % StrayKitty.frames[this.state].length]), 32 * this.type,
            32, 32, 0, 0, 32, 32);
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
        this.canvas.addEventListener("mousedown", (event) => {
            this.mouseXOffset = this.x - event.clientX;
            this.mouseYOffset = this.y - event.clientY;
            this.state = KittyStates.Grabbed;
        });
        document.body.appendChild(this.canvas);
        this.direction = StrayKitty.randomDir();
        this.type = typeof type === "number" ? type : Math.floor(Math.random() * 3);
        this.frame = //Setting all to 0
            this.animMax =
            this.y =
            this.xVector =
            this.yVector =
            this.animTimer = 0;
        this.x = Math.floor(Math.random() * window.innerWidth - 32);
        this.state = KittyStates.Standing;
        this.canvas = <HTMLCanvasElement>document.getElementById("kittycanvas" + this.id);
    }
    update(fps: number) {
        this.animTimer += 10 / fps
        this.updateState(fps);
        this.move(fps);
        this.checkBounds()
        this.draw();
    }
    flip() {
        if (this.direction === Direction.Left) {
            this.direction = Direction.Right;
        } else {
            this.direction = Direction.Left;
        }
    }
    updateGrabbed(e: MouseEvent) {
        this.x = e.clientX + this.mouseXOffset;
        this.y = e.clientY + this.mouseYOffset;
    }
    release() {
        this.state = KittyStates.Falling;
    }
    get isBeingGrabbed() {
        return this.state === KittyStates.Grabbed;
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
