/**
 * Created by goku on 2016/9/13.
 */
import {Component, Input} from "@angular/core";
import {Titie} from "./title";

@Component({
    selector: 'nb-app-note-template-title',
    templateUrl: `app/template/title.component.html`,
    styleUrls: ["app/template/title.component.css"]
})

export class TitleTemplateComponent {

    _notes: Titie[] = []

    @Input() set notes(notes) {
        this._notes = notes.map(n=>new Titie(n.id, JSON.parse(n.content), n.relations))
    }

    @Input() title: string

}