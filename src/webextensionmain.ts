import { StrayKittyManager } from "./StrayKittyManager";

var browser: any = require("webextension-polyfill");

let boss: StrayKittyManager | null = null;
let activateIcon = () => { browser.runtime.sendMessage({ message: "activate_icon" }) };
if (document.readyState === "complete" || document.readyState === "interactive") {
    activateIcon();
} else {
    document.addEventListener("DOMContentLoaded", activateIcon);
}

browser.runtime.onMessage.addListener(
    (message: string) => {
        if (message.indexOf("add-") > -1) {
            if (boss == null) {
                boss = new StrayKittyManager();
                boss.setImageSrc(
                    browser.runtime.getURL("kitties.png"));
                boss.start();
            }
            let number = (+message.substr(4, 1)) - 1;
            let scale = +message.substr(message.indexOf(",") + 1);
            boss.addKitty(number, scale);
        } else if (message.indexOf("remove") > -1) {
            if (boss != null) boss.removeKitty();
        } else if (message.indexOf("clear") > -1) {
            if (boss != null) boss.clearKitties();
        }
        return false;
    });

