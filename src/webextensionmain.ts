import { StrayKittyManager } from "./StrayKittyManager";
import { StrayKitty } from "./StrayKitty";

var browser: any = require("webextension-polyfill");
declare var imgsrc: string;

let boss: StrayKittyManager | null = null;
browser.runtime.onMessage.addListener(
    (message: "add" | "remove" | "clear") => {
        browser.storage.sync.get("fps").then((storage: any) => {
            switch (message) {
                case "add":
                    if (boss == null) {
                        StrayKitty.setImageSrc(imgsrc);
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

