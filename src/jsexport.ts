import { StrayKittyManager } from "./StrayKittyManager";
import { StrayKitty } from "./StrayKitty";
declare var imgsrc: string;

function init() {
    if ((window as any).imgsrc !== undefined) {
        StrayKitty.setImageSrc((window as any).imgsrc);
    }
    (<any>window).StrayKittyManager = StrayKittyManager;
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}
