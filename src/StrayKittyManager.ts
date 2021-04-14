import { StrayKitty } from "./StrayKitty";
import { KittyType } from "./KittyType";
export class StrayKittyManager {
    private kitties: StrayKitty[];
    private grabbedKitty?: StrayKitty;
    private intervalId?: number;
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
        this.kitties.forEach((kitty) => {
            kitty.update(this.fps);
            if (kitty.isBeingGrabbed) {
                if (this.grabbedKitty !== undefined &&
                    this.grabbedKitty !== kitty) {
                    this.releaseGrabbedKitty();
                }
                this.grabbedKitty = kitty;
            }
        })
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
            this.intervalId = window.setInterval(this.update, 1000 / this.fps);
        }
    }
    pause(): void {
        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId)
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
