const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const os = require('os');
const FOLDERPATH = path.join(os.homedir(), 'MockServer/projects');

let apis;

if(fs.existsSync(FOLDERPATH)) {
    let result = fs.readdirSync(FOLDERPATH, {
        encoding: 'utf8'
    });
    if(result.length) {
        // TODO temperary setting up default project to be the first folder
        let projectName = result[0];
        let configPath = path.join(path.join(FOLDERPATH, projectName), 'config.json');
        if(fs.existsSync(configPath)) {
            fs.readFile(configPath, (err, data) => {
                if(err) console.log(err);
                else {
                    apis = JSON.parse(data).apis;
                    apis.forEach(element => {
                        let replyPath = path.join(path.join(FOLDERPATH, projectName), element.response);
                        setRouter(element.url, element.verb, replyPath);
                    });
                }
            })
        }
    }
} else {
    console.log('Project folder does not exsit');
}

function setRouter(url, method, replyPath) {
    switch(method) {
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
}

module.exports = router;