/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";

@Component({
  selector: 'nb-app-note-command',
  templateUrl: `app/notes/note-command.component.html`,
  styleUrls: ["app/notes/note-command.component.css"]
})

export class NoteCommandComponent {
  @Input() set set_notes(notes) {
    console.info(notes, `${this.header} note before.`)
    this.notes = notes.map(n=>new CommandNote(n.id, JSON.parse(n.content), n.relations))
    console.info(this.notes, `${this.header} note after`)
  }

  notes: CommandNote[] = []
  header = "Command"
}

class CommandNote {
  id: number
  content: {contentOne: string, contentTwo: string}
  relations: number[]

  constructor(id: number, content: {contentOne: string, contentTwo: string}, relations: number[]) {
    this.id = id
    this.content = content
    this.relations = relations
  }
}