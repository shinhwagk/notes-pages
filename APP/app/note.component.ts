/**
 * Created by zhangxu on 2016/8/23.
 */
import {ApiServices} from "./api.services";
import {Component, Input} from "@angular/core";

@Component({
    selector: 'nb-app-note',
    templateUrl: `app/note.component.html`,
    styleUrls: ["app/note.component.css"],
    providers: [ApiServices]
})

export class NoteComponent {

    constructor(private _api: ApiServices) {
    }

    noteIdCollect(labels, num, noteIdArr) {
        let sl = labels[num]
        if (num == -1) {
            this.clearNote()
            let ids: number[] = this.filterCommonNoteId(noteIdArr)
            console.info(ids, "noteIdCollect")
            ids.forEach(id=> {
                this._api.getNote(id).toPromise().then(note=> this.noteDispatcher(note))
            })
        } else {
            this._api.getLabel(sl).toPromise().then(n=> {
                n.notes.forEach(id=>noteIdArr.push(id))
                this.noteIdCollect(labels, num - 1, noteIdArr)
            })
        }
    }

    filterCommonNoteId(id_arr) {
        let s = new Set<number>()
        id_arr.filter(le => id_arr.filter(le2 => le2 == le).length >= this.labels.length).forEach(v=>s.add(v))
        return Array.from<number>(s)
    }

    @Input() set _notes_str(labels) {
        this.labels = labels
        this.clearNote()
        this.noteIdCollect(labels, labels.length - 1, [])
    }

    clearNote() {
        this.concepts = []
        this.commands = []
        this.files = []
        this.operations = []
    }

    _note_ids: number[] = []
    concepts: {category: string}[] = []
    commands: {category: string}[] = []
    files: {category: string}[] = []
    operations: {category: string}[] = []
    labels: string[] = []

    noteDispatcher(note) {
        switch (note.category) {
            case "concept":
                this.concepts.push(note)
                this.concepts = this.concepts.slice(0)
                break
            case "command":
                this.commands.push(note)
                this.commands = this.commands.slice(0)
                break
            case "file":
                this.files.push(note)
                this.files = this.files.slice(0)
                break
            case "operation":
                this.operations.push(note)
                this.operations = this.operations.slice(0)
                break
            default:
                confirm("Sorry, that color is not in the system yet!");
        }

    }
}
