import { StrayKittyManager } from "./StrayKittyManager";
import { StrayKitty } from "./StrayKitty";
declare var imgsrc: string;

function init() {
    StrayKitty.setImageSrc(imgsrc);
    (<any>window).StrayKittyManager = StrayKittyManager;
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}
