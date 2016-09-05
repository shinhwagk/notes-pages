import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";
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
            id: 0,
            title: this._title,
            labelIds: this._selected_labels
        }
        this._api.addFile(file).toPromise().then(p=>console.info("add concept Success."))
    }
}

interface File {
    id: number
    title: string;
    labelIds: number[];
}