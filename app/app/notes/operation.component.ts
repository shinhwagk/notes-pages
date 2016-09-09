/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nb-app-note-operation',
  templateUrl: `app/notes/operation.component.html`,
  styleUrls: ["app/notes/operation.component.css"]
})

export class NoteOperationComponent {
  @Input() set set_notes(notes_str: string) {
    let notes = JSON.parse(notes_str)
    this.notes = notes.map(note=> new OperationNote(note.id,JSON.parse(note.content)))
  }

  header = "Operation"
  notes: {id: number,content: {title: string}}[] = []
}

class OperationNote {
  id: number
  content: {title: string}

  constructor(id: number, content: {title: string}) {
    this.id = id
    this.content = content
  }
}