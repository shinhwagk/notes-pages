import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";
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
        this._selected_labels.forEach(id=> {
            let operation: Operation = {
                id: 0,
                title: this._title,
                labelId: id
            }
            this._api.addOperation(operation).toPromise().then(r=>console.info("add operation success."))
        })
    }
}

interface Operation {
    id: number
    title: string;
    labelId: number;
}