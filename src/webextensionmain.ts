import { StrayKittyManager } from "./StrayKittyManager";
import { StrayKitty } from "./StrayKitty";

declare var imgsrc: string;
declare var browser: any;

StrayKitty.setImageSrc(imgsrc);
let boss = new StrayKittyManager(30);
boss.start();
browser.runtime.onMessage.addListener((message: "add" | "remove" | "clear") => {
    switch (message) {
        case "add":
            boss.addKitty();
            break;
        case "remove":
            boss.removeKitty();
            break;
        case "clear":
            boss.clearKitties();
            break;
    }
});
