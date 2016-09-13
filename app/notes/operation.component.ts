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
  @Input() set set_notes(notes) {
    console.info(notes, `${this.header} note before.`)
    this.notes = notes.map(n=>new OperationNote(n.id, JSON.parse(n.content), n.relations))
    console.info(this.notes, `${this.header} note after`)
  }

  header = "Operation"
  notes: OperationNote[] = []
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