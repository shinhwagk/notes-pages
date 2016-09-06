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
    _selected_labels: number[] = []

    @Input() set set_labels(ls: number[]) {
        this._selected_labels = ls
    }

    submit() {
        let concept: Concept = {
            title: this._title
        }
        let note: Note = {
            id: 0,
            category:"concept",
            content: JSON.stringify(concept),
            labelIds: this._selected_labels
        }
        this._api.addNote(concept).toPromise().then(p => console.info("add concept Success."))
    }
}

interface Concept {
    title: string;
}