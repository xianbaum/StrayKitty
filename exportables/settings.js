(() => {
    const defaultFps = 30;
    function saveSettings(fps) {
        browser.storage.sync.set({
            fps: fps
        });
    }
    function restoreSettings() {
        browser.storage.sync.get("fps").then((storage) => {
            document.getElementById("fps").value = storage.fps || defaultFps;
        },(e) => {
            document.getElementById("fpsError").style.display = "block";
            document.getElementById("fpsError").innerText = e;
        });
    }
    function resetErrors() {
        document.getElementById("fpsError").style.display = "none";
    }
    function saveSettingsClick(e) {
        e.preventDefault();
        resetErrors();
        let value = +document.getElementById("fps").value;
        if(typeof value !== "number" || value <= 0 || value > 300) {
            document.getElementById("fpsError").style.display = "block";
            return;
        }
        saveSettings(value);
    }
    function restoreDefaultsClick(e) {
        e.preventDefault();
        resetErrors();
        document.getElementById("fps").value = defaultFps;
        saveSettings(defaultFps);
    }
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementsByTagName("form")[0].addEventListener(
            "submit", saveSettingsClick);
        document.getElementById("resetButton").addEventListener(
            "click", restoreDefaultsClick);
        restoreSettings();
    });
})();
