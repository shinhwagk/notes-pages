import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";
/**
 * Created by zhangxu on 2016/8/26.
 */
@Component({
    selector: 'nb-edit-concept',
    templateUrl: `app/template/concept.component.html`,
    styleUrls: ['app/template/concept.component.css'],
    providers: [ApiServices]
})

export class TemplateConceptComponent {
    constructor(private _api: ApiServices) {
    }

    _title: string
    _selected_labels: number[] = []

    @Input() set set_labels(ls: number[]) {
        this._selected_labels = ls
    }

    submit() {
        this._selected_labels.forEach(id=> {
            let concept: Concept = {
                id: 0,
                title: this._title,
                labelId: id
            }
            this._api.addConcept(concept).toPromise().then(p=>console.info("add concept Success."))
        })

    }
}

interface Concept {
    id: number
    title: string;
    labelId: number;
}