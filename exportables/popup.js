function sendMessage(message){
    browser.tabs.query({}).then((tabs) => {
        for(let tab of tabs) {
            if(tab.active) {
                browser.tabs.sendMessage(tab.id, message);    
                return window.close();            
            }
        }
    })
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("add").addEventListener("click", () => sendMessage("add"));
    document.getElementById("remove").addEventListener("click", () => sendMessage("remove"));
    document.getElementById("clear").addEventListener("click", () => sendMessage("clear"));
});