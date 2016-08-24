/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nb-app-note-command',
  templateUrl: `app/notes/note-command.component.html`,
  styleUrls: ["app/notes/note-command.component.css"]
})

export class NoteCommandComponent {

  @Input() set set_notes(notes) {
    this.notes = notes
  }

  notes: CommandNote[] = []
}

interface CommandNote {
  id: number
  note: {content_1: string,content_2: string,doc_id: number}
  category: string
}