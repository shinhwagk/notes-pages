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
    _selected_labels: number[] = []

    @Input() set set_labels(ls: number[]) {
        this._selected_labels = ls
    }

    submit() {
        let file: File = {
            title: this._title
        }
        let note: Note = {
            id: 0,
            category:"file",
            content: JSON.stringify(file),
            labelIds: this._selected_labels
        }
        this._api.addNote(file).toPromise().then(p=>console.info("add concept Success."))
    }
}

interface File {
    title: string;
}