import { Component, OnInit, Input } from '@angular/core';

import { IpcService } from '../../services/ipc.service';
import { Config } from "../../models/config.model";

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

    isLive = false;
    config: Config = {
        host: "localhost",
        port: "7878",
        delay: "200"
    };

    constructor(private _ipc: IpcService) { }

    ngOnInit() {
        this.loadConfig();
    }

    loadConfig() {
        this._ipc.loadConfig().subscribe(data => {
            this.config = data;
        });
    }

    startServer() {
        this.isLive = true;
        this._ipc.startServer(this.config);
    }

    stopServer() {
        this.isLive = false;
        this._ipc.stopServer();
    }
}
