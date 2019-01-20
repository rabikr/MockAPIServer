const { app, BrowserWindow } = require("electron");

let mainWin = null;

function createWindow() {
    const option = {
        width: 800,
        height: 600,
        title: `Mock API Server - v${app.getVersion()}`,
    }
    mainWin = new BrowserWindow(option);
    mainWin.loadFile("../ui/dist/mockapi/index.html");
    mainWin.on("close", () => app.quit());
}

function init() {
    createWindow();
}

app.on("ready", init);
app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    }
})