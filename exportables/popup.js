((browser) => {
    let sandboxed = false;
    let boss = null;
    
    function initSandbox() {
        let promise = new Promise((resolve, reject) => {
            if(sandboxed) resolve();
            sandboxed = true;
            let script = document.createElement("script");
            script.src = "straykitty.js";
            script.type = "application/javascript";

            let errorPopup = document.getElementById("error");
            document.getElementById("errorMessage").style.display =
                errorPopup.style.display = "none"

            document.getElementById("sandbox").style.display =
                document.getElementById("sandboxMessage").style.display = "block";
            document.getElementById("controls").classList.add("popup");

            script.onload = () => {
                initControls();
                let sandboxHelpButton = document.getElementById("sandboxHelpButton");
                errorPopup.classList.add("popup");
                errorPopup.classList.add("popup");
                document.body.addEventListener("click", () => {
                    errorPopup.style.display = "none";
                });

                sandboxHelpButton.style.display = "flex";
                sandboxHelpButton.addEventListener("click", (e) => {
                    if(errorPopup.style.display === "none") {
                        errorPopup.style.display = "block";
                        e.stopPropagation();
                    }
                });
                resolve();
            }
            document.body.appendChild(script);
        });
        return promise;
    }

    function initContentScript() {
        document.getElementById("error").style.display = "none";
        initControls();
    }

    function sendMessage(message, retries) {
        if(sandboxed) sendMessageToSandbox(message);
        else sendMessageToContentScript(message, retries);
    }

    function sendMessageToSandbox(message) {
        if (message.indexOf("add-") > -1) {
            if (boss == null) {
                boss = new StrayKittyManager();
                boss.setImageSrc("kitties.png");
                boss.start();
            }
            let number = (+message.substr(4, 1)) - 1;
            let scale = +message.substr(message.indexOf(",")+1);
            boss.addKitty(number,scale);
        } else if (message.indexOf("remove") > -1) {
            if (boss != null) boss.removeKitty();
        } else if (message.indexOf("clear") > -1) {
            if (boss != null) boss.clearKitties();
        }
    }

    function sendMessageToContentScript(message, retries){
        if(typeof retries !== "number") retries = 0;
        if(retries >= 5) {
            initSandbox().then(() => {
                sendMessageToSandbox(message);
            });
        }
        window.browser.tabs.query({
            active: true, currentWindow: true
        }).then((tabs) => {
            for(let tab of tabs) {
                if(tab.status === "loading") {
                    window.setTimeout(() => {
                        sendMessage(message, retries+1);
                    }, 400);
                } else {
                    window.browser.tabs.sendMessage(
                        tab.id, message)
                        .catch((e) => {
                            initSandbox().then(() => {
                                sendMessageToSandbox(message);
                            });
                        });
                }
            }
        });
    }

    function testPage() {
        return window.browser.tabs.query({
            active: true, currentWindow: true
        }).then((tabs) => {
            for(let tab of tabs) {
                if(tab.url.indexOf("chrome:") == 0 ||
                   tab.url.indexOf("about:") == 0) {
                    return false;
                }
            }
            return true;
        });
    }

    controlsInit = false;
    function initControls() {
        if(controlsInit) return;
        controlsInit = true;
        let slider = document.getElementById("scaleSlider");

        document.getElementById("controls").style.display = "block";
        document.getElementById("add-1").addEventListener(
            "click", () => sendMessage("add-1," + slider.value, 0));
        document.getElementById("add-2").addEventListener(
            "click", () => sendMessage("add-2," + slider.value, 0));
        document.getElementById("add-3").addEventListener(
            "click", () => sendMessage("add-3," + slider.value, 0));
        document.getElementById("clear").addEventListener(
            "click", () => sendMessage("clear", 0));
    }

    testPage().then((pageWorks) => {
        if(pageWorks) {
            if(document.readyState === "complete" || document.readyState === "interactive") {
                initContentScript();
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    initContentScript();
                });
            }
        } else {
            initSandbox();
        }
    });
})(window.browser);
