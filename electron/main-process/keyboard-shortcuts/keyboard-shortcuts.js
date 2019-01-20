const { app, globalShortcut } = require("electron");

globalShortcut.register('CommandOrControl+Q', () => {
    app.quit();
});