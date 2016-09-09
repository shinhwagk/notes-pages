import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";
import {Note} from "./note"
/**
 * Created by zhangxu on 2016/8/26.
 */
@Component({
    selector: 'nb-edit-file',
    templateUrl: `app/template/file.component.html`,
    styleUrls: ['app/template/file.component.css'],
    providers: [ApiServices]
})

export class TemplateFileComponent {
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
            let file: File = { title: this._title }
            this._api.addNote(file, "file", this._selected_labels)
        }
    }
}

interface File {
    title: string;
}