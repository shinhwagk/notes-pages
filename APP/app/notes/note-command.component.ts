/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";

@Component({
  selector: 'nb-app-note-command',
  templateUrl: `app/notes/note-command.component.html`,
  styleUrls: ["app/notes/note-command.component.css"],
  providers: [ApiServices]
})

export class NoteCommandComponent {
  constructor(private _api: ApiServices) {
  }

  @Input() set set_notes(ids) {

    this.notes = []
    ids.forEach(id=> {
      this._api.getNote(id).toPromise().then(note=> this.notes.push(new CommandeNote(note.id, JSON.parse(note.content), note.relations)))
    })
  }

  notes: CommandeNote[] = []

  jsonToString(a) {
    return JSON.stringify(a)
  }
}

class CommandeNote {
  id: number
  content: {contentOne: string, contentTwo: string}
  relations: { [key: string]: number[]; }

  constructor(id: number, content: {contentOne: string, contentTwo: string}, relations: { [key: string]: number[]; }) {
    this.id = id
    this.content = content
    this.relations = relations
  }
}