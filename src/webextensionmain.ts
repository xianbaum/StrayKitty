import { StrayKittyManager } from "./StrayKittyManager";
import { StrayKitty } from "./StrayKitty";

var browser: any = require("webextension-polyfill");

let boss: StrayKittyManager | null = null;
let activateIcon = () => {browser.runtime.sendMessage({message: "activate_icon"})};
if (document.readyState === "complete" || document.readyState === "interactive") {
    activateIcon();
} else {
    document.addEventListener("DOMContentLoaded", activateIcon);
}
browser.runtime.onMessage.addListener(
    (message: "add" | "remove" | "clear") => {
        browser.storage.sync.get("fps").then((storage: any) => {
            switch (message) {
                case "add":
                    if (boss == null) {
                        StrayKitty.setImageSrc(browser.runtime.getURL("kitties.png"));
                        boss = new StrayKittyManager(storage.fps || 30);
                        boss.start();
                    }
                    boss.addKitty();
                    break;
                case "remove":
                    if (boss != null) boss.removeKitty();
                    break;
                case "clear":
                    if (boss != null) boss.clearKitties();
                    break;
            }
            return false;
        });
    });

