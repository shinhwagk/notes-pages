import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";
import {Note} from "./note"
/**
 * Created by zhangxu on 2016/8/26.
 */
@Component({
    selector: 'nb-edit-operation',
    templateUrl: `app/template/operation.component.html`,
    styleUrls: ['app/template/operation.component.css'],
    providers: [ApiServices]
})

export class TemplateOperationComponent {
    constructor(private _api: ApiServices) {
    }

    _title: string
    _selected_labels: string[] = []

    @Input() set set_labels(ls: string[]) {
        this._selected_labels = ls
    }

    submit() {
        if (this._selected_labels.length == 0) {
            alert("为选择label.")
        } else {
            let operation: Operation = { title: this._title, }
            this._api.addNote(operation, "operation", this._selected_labels)
        }
    }
}

interface Operation {
    title: string;
}