/**
 * Created by zhangxu on 2016/8/23.
 */
import {ApiServices} from "./api.services";
import {Component, OnInit, Input} from "@angular/core";
import {NoteConceptComponent} from "./notes/note-concept.component";
import {NoteCommandComponent} from "./notes/note-command.component";
import {NoteFileComponent} from "./notes/note-file.component";

@Component({
    selector: 'nb-app-note',
    templateUrl: `app/note.component.html`,
    styleUrls: ["app/note.component.css"],
    providers: [ApiServices],
    directives: [NoteConceptComponent, NoteCommandComponent, NoteFileComponent]
})

export class NoteComponent implements OnInit {
    ngOnInit(): void {
    }

    constructor(private _apiServices: ApiServices) {
    }

    _note_ids: number[] = []

    _note_id_commands: any[] = []
    _note_id_concepts: any[] = []
    _note_id_files: any[] = []

    @Input() set _notes_str(nids: string) {
        this._note_ids = JSON.parse(nids)

        let notes = {"command": new Array<any>(), "concept": new Array<any>(), "file": new Array<any>()}

        this._note_ids.forEach(id=>
            this._apiServices.getNote(id).toPromise().then(n=>this.note_dispatcher(n, notes))
        )
    }

    note_dispatcher(note, notes) {
        switch (note.category) {
            case "concept":
                notes.concept.push(note)
                this._note_id_concepts = notes.concept
                break
            case "command":
                notes.command.push(note)
                this._note_id_commands = notes.command
                break
            case "file":
                notes.file.push(note)
                this._note_id_files = notes.file
                break
            default:
                confirm("Sorry, that color is not in the system yet!");
        }
    }

    clear_note() {
        this._note_id_commands = []
        this._note_id_concepts = []
        this._note_id_files = []
    }
}