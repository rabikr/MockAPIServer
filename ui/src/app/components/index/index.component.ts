import { Component, OnInit } from '@angular/core';

import { IpcService } from "../../services/ipc.service";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(private _ipc: IpcService) { }

    ngOnInit() { }

}
