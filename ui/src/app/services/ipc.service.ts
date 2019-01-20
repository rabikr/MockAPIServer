import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IpcRenderer } from "electron";
import { Observable } from 'rxjs';

import { Config } from "../models/config.model";

@Injectable({
    providedIn: 'root'
})
export class IpcService {

    // Put it outside of constructor or else won't serve in angular
    private _ipc: IpcRenderer;

    constructor(private _http: HttpClient) {
        if ((<any>window).require) {
            try {
                this._ipc = (<any>window).require("electron").ipcRenderer;
            } catch (error) {
                throw error;
            }
        } else {
            console.warn("Could not load electron ipc");
        }
    }

    startServer(data) {
        this._ipc.send("startServer", data);
    }

    stopServer() {
        this._ipc.send("stopServer");
    }

    loadConfig(): Observable<Config> {
        return this._http.get<Config>("./assets/config.json");
    }

    get ipc() {
        return this._ipc;
    }

}
