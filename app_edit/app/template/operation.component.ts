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
    _selected_labels: number[] = []

    @Input() set set_labels(ls: number[]) {
        this._selected_labels = ls
    }

    submit() {
        let operation: Operation = {
            title: this._title,
        }
        let note: Note = {
            id: 0,
            category:"operation",
            content: JSON.stringify(operation),
            labelIds: this._selected_labels
        }
        this._api.addNote(operation).toPromise().then(r => console.info("add operation success."))
    }
}

interface Operation {
    title: string;
}