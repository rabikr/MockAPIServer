import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IpcService } from 'src/app/services/ipc.service';
import { APIs } from 'src/app/models/apis.models';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @ViewChild("list") listElement: ElementRef;
    projectList: string[];
    selected: string;
    apiList: APIs[];

    constructor(private _ipc: IpcService) { }

    ngOnInit() {
        this.getProjects();
        this.setProjects();
        this.setAPIs();
    }

    getProjects() {
        this._ipc.getProjects();
    }

    setProjects() {
        this._ipc.ipc.on("projectsList", (event, list) => {
            this.projectList = list;
            this.selected = list[0];
            this.getAPIs(this.selected);
        });
    }

    getAPIs(project: string) {
        this._ipc.getAPIs(project);
    }

    setAPIs() {
        this._ipc.ipc.on("apiList", (event, list) => {
            this.apiList = list;
            this.makeList(list);
        });
    }

    onChange(e) {
        this.getAPIs(this.selected);
    }

    makeList(list: APIs[]) {
        let listItems = "";
        list.forEach(item => {
            listItems += `<li><button>${item.url}</button></li>\n`;
        });
        this.listElement.nativeElement.innerHTML = listItems;
    }

}