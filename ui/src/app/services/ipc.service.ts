import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private _ipc: IpcRenderer;

  constructor() {
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

  private sendMsg(msg, data?) {
    this._ipc.send(msg, data);
  }

  startServer() {
    this.sendMsg('startServer');
  }

}
