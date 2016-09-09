/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nb-app-note-concept',
  templateUrl: `app/notes/note-concept.component.html`,
  styleUrls: ["app/notes/note-concept.component.css"]
})

export class NoteConceptComponent {
  @Input() set set_notes(notes_str) {
    let notes = JSON.parse(notes_str)
    this.notes = notes.map(note=> new ConceptNote(note.id,JSON.parse(note.content)))
  }

  notes: ConceptNote[] = []
}

class ConceptNote {
  id: number
  content: {title: string}

  constructor(id: number, content: {title: string}) {
    this.id = id
    this.content = content
  }
}