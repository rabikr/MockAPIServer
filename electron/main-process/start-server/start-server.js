const { ipcMain } = require("electron");

ipcMain.on("startServer", (event, data) => {
    console.log("server start request", data);
});