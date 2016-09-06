import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";
import {Note} from "./note"
/**
 * Created by zhangxu on 2016/8/26.
 */
@Component({
    selector: 'nb-edit-label',
    templateUrl: `app/template/label.component.html`,
    styleUrls: ['app/template/label.component.css'],
    providers: [ApiServices]
})

export class TemplateLabelComponent {
    constructor(private _api: ApiServices) {
    }

    _name: string

    submit() {
        let label: Label = { id: 0, name: this._name }
        this._api.addLabel(label).toPromise().then(p => console.info("add label Success."))
    }
}

interface Label {
    id: number
    name: string;
}