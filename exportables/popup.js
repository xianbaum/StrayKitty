((browser) => {
    function showErrorPage() {
        document.getElementById("errorPage").style.display = "block";
        document.getElementById("successPage").style.display = "none";
    }
    function sendMessage(message, retries){
        if(typeof retries !== "number") retries = 0;
        if(retries >= 5) showErrorPage();
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
                        tab.id, message).catch((e) => { showErrorPage(); });
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
    function initPopup() {
        document.getElementById("errorPage").style.display = "none";
        document.getElementById("successPage").style.display = "block";
        document.getElementById("add-1").addEventListener(
            "click", () => sendMessage("add-1", 0));
        document.getElementById("add-2").addEventListener(
            "click", () => sendMessage("add-2", 0));
        document.getElementById("add-3").addEventListener(
            "click", () => sendMessage("add-3", 0));
        document.getElementById("clear").addEventListener(
            "click", () => sendMessage("clear", 0));
    }
    testPage().then((pageWorks) => {
        if(pageWorks) {
            console.log("shits not broke?")
            if(document.readyState === "complete" || document.readyState === "interactive") {
                console.log("dom was complete")
                initPopup();
            } else {
                console.log("event listener added, dom was "+document.readyState)
                document.addEventListener('DOMContentLoaded', () => {
                    initPopup();
                });
            }
        } else {
            console.log("shits broke")
        }
    });
    console.log("idk man this shit ran")
})(window.browser);
