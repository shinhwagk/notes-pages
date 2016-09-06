/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";
import {Note} from "./note"

@Component({
    selector: 'nb-app-note-command',
    templateUrl: `app/notes/note-command.component.html`,
    styleUrls: ["app/notes/note-command.component.css"]
})

export class NoteCommandComponent {
    @Input() set set_notes(notes: Note<string>[]) {
        this.notes = notes.map(note=>new Note<Command>(note.id, JSON.parse(note.content), note.category))
    }

    notes: Note<Command>[] = []

}

interface Command {
    contentOne: string
    contentTwo: string
}