import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    tableData = tableData;

    constructor() { }

    ngOnInit() {
    }

}

const tableData = [
    { key: "this is key", value: "this is value" },
    { key: "this is key", value: "this is value" },
    { key: "this is key", value: "this is value" },
    { key: "this is key", value: "this is value" },
    { key: "this is key", value: "this is value" },
    { key: "this is key", value: "this is value" },
    { key: "this is key", value: "this is value" },
    { key: "this is key", value: "this is value" }
]
