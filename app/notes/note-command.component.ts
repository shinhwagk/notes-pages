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
  @Input() set set_notes(notes_str) {
    let notes = JSON.parse(notes_str)
    this._notes = notes.map(note=> new CommandeNote(note.id, JSON.parse(note.content)))
  }

  _notes: CommandeNote[] = []

}

class CommandeNote {
  id: number
  content: {contentOne: string, contentTwo: string}

  constructor(id: number, content: {contentOne: string, contentTwo: string}) {
    this.id = id
    this.content = content
  }
}