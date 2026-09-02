let browser = globalThis.browser ? globalThis.browser : globalThis.chrome;

function setIcon(tabId, path) {
    let done = browser.action.setIcon({path: path, tabId: tabId});
    if (done && typeof done.catch === "function") {
        done.catch(() => {});
    }
}

browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    if (request.message === "activate_icon" && sender.tab) {
        setIcon(sender.tab.id, "icon-16.png");
    }
});

// A page is assumed dead until its content script reports in with activate_icon.
function handleUpdated(details) {
    if(details.frameId == 0) {
        setIcon(details.tabId, "icon-16-gray.png");
    }
}

browser.webNavigation.onCommitted.addListener(handleUpdated);
