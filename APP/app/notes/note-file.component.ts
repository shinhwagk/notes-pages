/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";

@Component({
    selector: 'nb-app-note-file',
    templateUrl: `app/notes/note-file.component.html`,
    styleUrls: ["app/notes/note-file.component.css"]
})

export class NoteFileComponent {
    @Input() set set_notes(notes) {
        console.info(notes, "files note before.")
        this.notes = notes.map(n=>new FileNote(n.id, JSON.parse(n.content), n.relations))
        console.info(this.notes, "files note after.")
    }

    header = "File"
    notes: FileNote[] = []
}

class FileNote {
    id: number
    content: {title: string}
    relations: number[]

    constructor(id: number, content: {title: string}, relations: number[]) {
        this.id = id
        this.content = content
        this.relations = relations
    }
}