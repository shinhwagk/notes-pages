/**
 * Created by zhangxu on 2016/8/23.
 */
import {ApiServices} from "./api.services";
import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: 'nb-app-note',
  templateUrl: `app/note.component.html`,
  styleUrls: ["app/note.component.css"],
  providers: [ApiServices]
})

export class NoteComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private _apiServices: ApiServices) {
  }

  _note_ids: number[] = []

  _note_commands: Note[] = []
  _note_concepts: Note[] = []
  _note_files: Note[] = []
  _note_operations: Note[] = []

  _note_commands_str: string = "{}"
  _note_concepts_str: string = "{}"
  _note_files_str: string = "{}"
  _note_operations_str: string = "{}"

  clear_note_str_and_note_container() {
    this._note_commands = []
    this._note_concepts = []
    this._note_files = []
    this._note_operations = []
    this._note_commands_str = "{}"
    this._note_concepts_str = "{}"
    this._note_files_str = "{}"
    this._note_operations_str = "{}"
  }

  @Input() set _notes_str(nids: string) {
    this._note_ids = JSON.parse(nids)
    this.clear_note_str_and_note_container()
    this._note_ids.forEach(id =>
      this._apiServices.getNote(id).toPromise().then(n => this.note_dispatcher(n))
    )
  }

  note_dispatcher(note) {
    switch (note.category) {
      case "concept":
        this._note_concepts.push(note)
        this._note_concepts_str = JSON.stringify(this._note_concepts)
        break
      case "command":
        this._note_commands.push(note)
        this._note_commands_str = JSON.stringify(this._note_commands)
        break
      case "file":
        this._note_files.push(note)
        this._note_files_str = JSON.stringify(this._note_files)
        break
      case "operation":
        this._note_operations.push(note)
        this._note_operations_str = JSON.stringify(this._note_operations)
        break
      default:
        confirm("Sorry, that color is not in the system yet!");
    }
  }
}
export interface Note {
  id: number;
  content: string;
  category: string
}