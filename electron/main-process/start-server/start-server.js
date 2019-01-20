const { ipcMain } = require("electron");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

ipcMain.on("startServer", (event, data) => {
    app.use((req, res, next) => {
        console.log(`${req.connection.remoteAddress} ${req.method} ${req.originalUrl}`);
        setTimeout(next, parseInt(data.delay));
    });
    app.use('/', require('./router.js'));
    app.use('**', (req, res) => res.json({ status: 404 }));
    server.listen(data.port || 7878, data.host || 'localhost', () => {
        let serverInfo = server._connectionKey.split(":");
        console.log(`Server is now live @${serverInfo[1]}:${serverInfo[2]} with ${data.delay}ms delays`);
    });
});

ipcMain.on("stopServer", (event, data) => {
    console.log('Stopping the server...');
    server.close();
    server.on('close', () => {
        console.log('Server has stopped');
    });
});