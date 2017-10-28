import { StrayKittyManager } from "./StrayKittyManager";
import { StrayKitty } from "./StrayKitty";
declare var imgsrc: string;
document.addEventListener('DOMContentLoaded', () => {
    StrayKitty.setImageSrc(imgsrc);
    (<any>window).StrayKittyManager = StrayKittyManager;
});