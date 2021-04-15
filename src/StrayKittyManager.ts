import { StrayKitty } from "./StrayKitty";
import { KittyType } from "./KittyType";
export class StrayKittyManager {
    private kitties: StrayKitty[];
    private grabbedKitty?: StrayKitty;
    private intervalId?: number;
    private lastFrameTime?: number;
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
    private update = () => {
        let now = Date.now();
        if(this.lastFrameTime === undefined) this.lastFrameTime = now;
        let dt = now - this.lastFrameTime;
        if(dt >= 1000 / this.fps){
            this.lastFrameTime = now;
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
        }
        if(this.intervalId !== undefined) {
            this.intervalId = window.requestAnimationFrame(this.update);
        }
    }
    constructor(private fps: number) {
        document.addEventListener("mousemove", this.updateGrabbedKitty);
        document.addEventListener("blur", this.releaseGrabbedKitty);
        document.addEventListener("mouseup", this.releaseGrabbedKitty);
        this.kitties = [];
    }
    get kittyCount() {
        return this.kitties.length;
    }
    addKitty(type?: KittyType): number {
        return this.kitties.push(new StrayKitty(type)) - 1;
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
    }
    clearKitties(): void {
        for (var k of this.kitties) {
            k.dispose();
        }
        this.kitties = [];
    }
    start(): void {
        if (this.intervalId === undefined) {
            this.intervalId = window.requestAnimationFrame(this.update);
        }
    }
    pause(): void {
        if (this.intervalId !== undefined) {
            clearTimeout(this.intervalId)
            this.intervalId = undefined;
        }
    }
    toggle() {
        if (this.intervalId !== undefined) {
            this.pause();
        } else {
            this.start();
        }
    }
    setImageSrc(src: string) {
        StrayKitty.setImageSrc(src);
    }
}
