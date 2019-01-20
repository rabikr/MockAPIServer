const { ipcMain } = require('electron');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const os = require('os');
const FOLDERPATH = path.join(os.homedir(), 'MockServer/projects');

let apis = null;

ipcMain.on('requestProjects', (event, arg) => {
    if (fs.existsSync(FOLDERPATH)) {
        let result = fs.readdirSync(FOLDERPATH, { encoding: 'utf8' });
        if (result.length) event.sender.send('projectsList', result);
    } else {
        fs.mkdir(FOLDERPATH, { recursive: true }, (err) => {
            // TODO Curr Node v:10.11, v10.12 supports recursive
            if (err) console.log(`Error: Cannot create project folder`);
            else console.log(`Project folder ${FOLDERPATH} in empty`);
        });
    }
});

ipcMain.on("readProject", (event, project) => {
    let configPath = `${FOLDERPATH}/${project}/config.json`;
    if (fs.existsSync(configPath)) {
        fs.readFile(configPath, (err, data) => {
            if (err) console.log(err);
            else {
                apis = JSON.parse(data).apis;
                event.sender.send('apiList', apis);
                apis.forEach(element => {
                    let replyPath = `${FOLDERPATH}/${project}/response/${element.response}`;
                    setRouter(element.url, element.verbs, replyPath);
                });
            }
        })
    }
});

function readProject(event, project) {
    let configPath = `${FOLDERPATH}/${project}/config.json`;
    if (fs.existsSync(configPath)) {
        fs.readFile(configPath, (err, data) => {
            if (err) console.log(err);
            else {
                apis = JSON.parse(data).apis;
                event.sender.send('apiList', apis);
                apis.forEach(element => {
                    let replyPath = `${FOLDERPATH}/${project}/response/${element.response}`;
                    setRouter(element.url, element.verbs, replyPath);
                });
            }
        })
    }
}

function setRouter(url, methods, replyPath) {
    methods.forEach((method) => {
        switch (method) {
            case 'GET': router.get(url, (req, res) => {
                res.json(require(replyPath));
            }); break;
            case 'POST': router.post(url, (req, res) => {
                res.json(require(replyPath));
            }); break;
            case 'PUT': router.put(url, (req, res) => {
                res.json(require(replyPath));
            }); break;
            case 'DELETE': router.delete(url, (req, res) => {
                res.json(require(replyPath));
            }); break;
            default: break;
        }
    });
}

module.exports = router;