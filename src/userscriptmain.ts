// ==UserScript==
// @name        StrayKitty
// @namespace   http://christianbaum.com
// @description A cat toy
// @include     *
// @version     2
// @grant       none
// ==/UserScript==

import { StrayKittyManager } from "./StrayKittyManager";
declare var imgsrc: string;

function setCss(div: HTMLButtonElement, xPos: number) {
    div.style.width = "16px";
    div.style.height = "16px";    
    div.style.backgroundColor = "pink";
    div.style.borderColor = "black";
    div.style.borderWidth = "1px";
    div.style.borderStyle = "solid";
    div.style.fontFamily = "monospace";
    div.style.fontSize = "12px";
    div.style.color = "black";
    div.style.cursor = "pointer";
    div.style.position = "fixed";
    div.style.top = "1px";
    div.style.zIndex = "10000";
    div.style.left = ""+xPos+"px";
    div.style.padding = "0";
    div.style.textAlign = "center";
}
document.addEventListener('DOMContentLoaded', () => {
    let boss = new StrayKittyManager(30);
    boss.setImageSrc(imgsrc);
    boss.start();
    let addButton = document.createElement("button");
    let removeButton = document.createElement("button");
    setCss(addButton, 1);
    setCss(removeButton, 18);
    addButton.onclick = () => {
        boss.addKitty();
        if(!document.body.contains(removeButton)) {
            document.body.appendChild(removeButton);
        }
    }
    addButton.innerHTML = "+";
    removeButton.onclick = () => {
        boss.removeKitty();
        if(boss.kittyCount === 0 && document.body.contains(removeButton)) {
            document.body.removeChild(removeButton);
        }
    }
    removeButton.innerHTML = "-";
    document.body.appendChild(addButton);
});