import { StrayKitty } from "./StrayKitty";
import { KittyType } from "./KittyType";
import { TimestampCalculator } from "./TimestampCalculator";

export class StrayKittyManager {
    private kitties: StrayKitty[];
    private grabbedKitty?: StrayKitty;
    private frameId?: number;
    private timestampCalculator: TimestampCalculator;

    constructor() {
        document.addEventListener("mousemove", this.updateGrabbedKitty);
        document.addEventListener("blur", this.releaseGrabbedKitty);
        document.addEventListener("mouseup", this.releaseGrabbedKitty);
        this.timestampCalculator = new TimestampCalculator();
        this.kitties = [];
    }

    get kittyCount() {
        return this.kitties.length;
    }

    addKitty(type?: KittyType, scale?: number): number {
        if (this.kittyCount == 0) {
            this.start();
        }
        return this.kitties.push(new StrayKitty(type, scale)) - 1;
    }

    removeKitty(num?: number): void {
        if (typeof num === undefined) {
            let kitty = this.kitties.pop();
            if (kitty !== undefined) {
                kitty.dispose();
            }
        } else {
            let kitties = this.kitties.splice(<number>num, 1)
            for (var k of kitties) {
                k.dispose();
            }
        }
        if (this.kittyCount == 0) {
            this.pause();
        }
    }

    clearKitties(): void {
        for (var k of this.kitties) {
            k.dispose();
        }
        this.kitties = [];
        this.pause();
    }

    start(): void {
        this.queueNextFrame();
    }

    pause(): void {
        this.cancelNextFrame();
        this.resetFirefoxRedrawHack();
    }

    toggle() {
        if (this.frameId !== undefined) {
            this.pause();
        } else {
            this.start();
        }
    }

    setImageSrc(src: string) {
        StrayKitty.setImageSrc(src);
    }

    private releaseGrabbedKitty = () => {
        if (this.grabbedKitty !== undefined) {
            this.grabbedKitty.release();
            this.grabbedKitty = undefined;
        }
    }

    private updateGrabbedKitty = (event: MouseEvent) => {
        if (this.grabbedKitty !== undefined) {
            this.grabbedKitty.updateGrabbed(event);
        }
    }

    private frame = () => {
        let dt = this.timestampCalculator.getDeltaTime();

        this.firefoxRedrawHack();

        this.kitties.forEach((kitty) => {
            kitty.update(dt);
            if (kitty.isBeingGrabbed) {
                if (this.grabbedKitty !== undefined &&
                    this.grabbedKitty !== kitty) {
                    this.releaseGrabbedKitty();
                }
                this.grabbedKitty = kitty;
            }
        });

        this.queueNextFrame();
    }

    private queueNextFrame() {
        this.cancelNextFrame();
        this.frameId = window.requestAnimationFrame(this.frame);
    }

    private cancelNextFrame() {
        if (this.frameId !== undefined) {
            window.cancelAnimationFrame(this.frameId);
            this.frameId = undefined;
        }
    }

    // Firefox will leave ugly trails without this.
    // https://stackoverflow.com/questions/366601/how-can-i-convince-firefox-to-redraw-css-pseudo-elements
    private redrawState: boolean = false;
    private firefoxRedrawHack() {
        if (typeof (window as any).InstallTrigger === "undefined") return;
        if (this.redrawState) {
            document.body.style.opacity = "1";
        } else {
            document.body.style.opacity = ".989";
        }
        this.redrawState = !this.redrawState;
    }

    private resetFirefoxRedrawHack() {
        if (typeof (window as any).installTrigger === "undefined") return;
        document.body.style.opacity = "1";
    }
}
