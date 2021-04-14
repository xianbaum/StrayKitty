var browser = (window.browser)? window.browser : window.chrome;
let timeouts = {};

function clearTimeouts(tabId){
    if(timeouts[tabId] != null) {
        clearTimeout(timeouts[tabId]);
        timeouts[tabId] = null;
    }
}

browser.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
    if (request.message === "activate_icon") {
        console.error("activate " + sender.tab.id );
        clearTimeouts(sender.tab.id);
        browser.browserAction.setIcon({path: "icon-16.png", tabId: sender.tab.id});
    }
});

function handleUpdated(details) {
    if(details.frameId == 0) {
        if(details.url.indexOf("chrome") == 0 ||
        details.url.indexOf("about") == 0) {
            browser.browserAction.setIcon({path: "icon-16-gray.png", tabId: details.tabId});
        }
        clearTimeouts(details.tabId);
        console.error("start " + details.tabId );
        timeouts[details.tabId] = setTimeout(() => {
            console.error("done " + details.tabId );
            clearTimeouts(details.tabId);
            browser.browserAction.setIcon({path: "icon-16-gray.png", tabId: details.tabId});
        }, 2000);
    }
}

  
browser.webNavigation.onCommitted.addListener(handleUpdated);
