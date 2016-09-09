import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";
import {Note} from "./note"
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
    _selected_labels: string[] = []

    @Input() set set_labels(ls: string[]) {
        this._selected_labels = ls
    }

    submit() {
        if (this._selected_labels.length == 0) {
            alert("为选择label.")
        } else {
            let concept: Concept = { title: this._title }
            this._api.addNote(concept, "concept", this._selected_labels)
        }
    }
}

interface Concept {
    title: string;
}