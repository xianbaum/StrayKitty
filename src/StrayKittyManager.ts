import { StrayKitty, KittyType } from "./StrayKitty";
export class StrayKittyManager {
    private kitties: StrayKitty[];
    private grabbedKitty?: StrayKitty;
    private intervalId?: number;
    private releaseGrabbedKitty = () => {
        if(this.grabbedKitty !== undefined) {
            this.grabbedKitty.release();
            this.grabbedKitty = undefined;            
        }
    }
    private updateGrabbedKitty = (event: MouseEvent) => {
        if(this.grabbedKitty !== undefined) {
            this.grabbedKitty.updateGrabbed(event);
        }
    }
    private update = () => {
        this.kitties.forEach( (kitty) => {
            kitty.update(this.fps);
            if(kitty.isBeingGrabbed) {
                if(this.grabbedKitty !== undefined && this.grabbedKitty !== kitty) {
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
    get kittyCount(){
        return this.kitties.length;
    }
    addKitty(type?: KittyType){
        this.kitties.push(new StrayKitty(type));
    }
    removeKitty(num?: number){
        if(typeof num === undefined) {
            let kitty = this.kitties.pop();
            if(kitty !== undefined) {
                kitty.dispose();                
            }
        } else {
            let kitties = this.kitties.splice(<number>num, 1)
            if(kitties !== undefined) {
                for(var k of kitties){
                    k.dispose();                    
                }
            }
        }
    }
    clearKitties() {
        for(var k of this.kitties){
            if(k !== undefined) {
                k.dispose();
            }
        }
        this.kitties = [];
    }
    start() {
        if(this.intervalId === undefined) {
            this.intervalId = setInterval(this.update, 1000/this.fps);
        }
    }
    pause() {
        if(this.intervalId !== undefined) {
            clearInterval(this.intervalId)
            this.intervalId = undefined;            
        }
    }
    toggle() {
        if(this.intervalId !== undefined) {
            this.pause();
        } else {
            this.start();
        }
    }
    setImageSrc(src: string){
        StrayKitty.setImageSrc(src);
    }
}