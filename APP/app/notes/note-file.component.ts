/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nb-app-note-file',
  templateUrl: `app/notes/note-file.component.html`,
  styleUrls: ["app/notes/note-file.component.css"]
})

export class NoteFileComponent {
  @Input() set set_notes(notes_str) {
    let notes = JSON.parse(notes_str)
    this.notes = notes.map(note=> new FileNote(note.id,JSON.parse(note.content)))
  }

  header = "File"
  notes: FileNote[] = []
}

class FileNote {
  id: number
  content: {title: string}

  constructor(id: number, content: {title: string}) {
    this.id = id
    this.content = content
  }
}