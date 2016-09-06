/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";
import {Note} from "./note"
@Component({
  selector: 'nb-app-note-command',
  templateUrl: `app/notes/note-command.component.html`,
  styleUrls: ["app/notes/note-command.component.css"]
})

export class NoteCommandComponent {
  @Input() set set_notes(notes) { this.notes = notes }

  notes: Note[] = []
}

interface Command {
  contentOne: string
  contentTwo: string
}