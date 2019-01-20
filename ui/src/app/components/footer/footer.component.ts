import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IpcService } from 'src/app/services/ipc.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @ViewChild("serverMsg") msgDisplay: ElementRef;

    constructor(private _ipc: IpcService) { }

    ngOnInit() {
        this.setLog();
    }

    setLog() {
        this._ipc.ipc.on("serverLog", (event, data) => {
            this.msgDisplay.nativeElement.innerText = data;
        });
    }

}
