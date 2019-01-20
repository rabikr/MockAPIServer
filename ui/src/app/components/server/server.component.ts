import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    startServer(e) {
        console.log("start clicked", e);
    }

    stopServer(e) {
        console.log("stop clicked", e);
    }
}
