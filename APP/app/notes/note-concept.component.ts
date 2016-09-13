/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";

@Component({
    selector: 'nb-app-note-concept',
    templateUrl: `app/notes/note-concept.component.html`,
    styleUrls: ["app/notes/note-concept.component.css"]
})

export class NoteConceptComponent {

    @Input() set set_notes(notes) {
        console.info(notes, "concepts note before.")
        this.notes = notes.map(n=>new ConceptNote(n.id, JSON.parse(n.content), n.relations))
        console.info(this.notes, "concepts note after.")
    }

    notes: ConceptNote[] = []
}

class ConceptNote {
    id: number
    content: {title: string}
    relations: number[]

    constructor(id: number, content: {title: string}, relations: number[]) {
        this.id = id
        this.content = content
        this.relations = relations
    }
}