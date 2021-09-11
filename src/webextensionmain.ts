import { StrayKittyManager } from "./StrayKittyManager";
import { StrayKitty } from "./StrayKitty";

var browser: any = require("webextension-polyfill");

let boss: StrayKittyManager | null = null;
let activateIcon = () => { browser.runtime.sendMessage({ message: "activate_icon" }) };
if (document.readyState === "complete" || document.readyState === "interactive") {
    activateIcon();
} else {
    document.addEventListener("DOMContentLoaded", activateIcon);
}
browser.runtime.onMessage.addListener(
    (message: "add-1" | "add-2" | "add-3" | "remove" | "clear") => {
        browser.storage.sync.get("fps").then((storage: any) => {
            switch (message) {
                case "add-1":
                case "add-2":
                case "add-3":
                    if (boss == null) {
                        StrayKitty.setImageSrc(browser.runtime.getURL("kitties.png"));
                        boss = new StrayKittyManager();
                    }
                    let number = (+message.substr(4, 1)) - 1;
                    boss.addKitty(number);
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

