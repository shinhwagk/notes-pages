/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";

@Component({
  selector: 'nb-app-note-concept',
  templateUrl: `app/notes/note-concept.component.html`,
  styleUrls: ["app/notes/note-concept.component.css"],
  providers: [ApiServices]
})

export class NoteConceptComponent {
  constructor(private _api: ApiServices) {
  }

  @Input() set set_notes(ids) {
    this.notes = []
    ids.forEach(id=> {
      this._api.getNote(id).toPromise().then(note=> this.notes.push(new ConceptNote(note.id, JSON.parse(note.content), note.relations)))
    })
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