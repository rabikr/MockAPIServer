const { app, BrowserWindow } = require("electron");
const glob = require("glob");
const path = require('path');

let mainWin = null;

// Create the application main view
function createWindow() {
    const option = {
        width: 950,
        height: 600,
        title: `Mock API Server - v${app.getVersion()}`,
    }
    mainWin = new BrowserWindow(option);
    mainWin.loadFile("../ui/dist/mockapi/index.html");
    mainWin.on("close", () => app.quit());
}

// If app is running, clicking to start the app again will resume the running app
function makeSingleInstance() {
    if (process.mas) return
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (mainWin) {
            if (mainWin.isMinimized()) {
                mainWin.restore();
            }
            mainWin.focus();
        }
    });
}
  
// Require each JS file in the main-process dir
function load() {
    const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
    files.forEach((file) => { require(file) });
}

// Initialize the main process
function init() {
    makeSingleInstance();
    load();
    createWindow();
}

app.on("ready", init);
app.on('activate', () => {
    if (mainWin === null) {
        createWindow();
    }
});
app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    }
});