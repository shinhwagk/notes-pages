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
  @Input() set set_notes(notes) {
    this.notes = notes
  }

  notes: ConceptNote[] = []
}

interface ConceptNote {
  id: number
  note: {title: string,doc_id: number}
  category: string
}