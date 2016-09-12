/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";

@Component({
  selector: 'nb-app-note-operation',
  templateUrl: `app/notes/operation.component.html`,
  styleUrls: ["app/notes/operation.component.css"],
  providers: [ApiServices]
})

export class NoteOperationComponent {
  constructor(private _api: ApiServices) {
  }

  @Input() set set_notes(ids) {
    this.notes = []
    ids.forEach(id=> {
      this._api.getNote(id).toPromise().then(note=> this.notes.push(new OperationNote(note.id, JSON.parse(note.content), note.relations)))
    })
  }

  header = "Operation"
  notes: {id: number,content: {title: string}}[] = []
}

class OperationNote {
  id: number
  content: {title: string}
  relations: number[]

  constructor(id: number, content: {title: string}, relations: number[]) {
    this.id = id
    this.content = content
    this.relations = relations
  }
}