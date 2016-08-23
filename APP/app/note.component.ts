/**
 * Created by zhangxu on 2016/8/23.
 */
import {ApiServices} from "./api.services";
import {Component, OnInit, Input} from "@angular/core";
import {NoteConceptComponent} from "./notes/note-concept.component";
import {NoteCommandComponent} from "./notes/note-command.component";
import {NoteFileComponent} from "./notes/note-file.component";

@Component({
  selector: 'nb-app-note',
  templateUrl: `app/note.component.html`,
  styleUrls: ["app/note.component.css"],
  providers: [ApiServices],
  directives: [NoteConceptComponent, NoteCommandComponent, NoteFileComponent]
})

export class NoteComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private _apiServices: ApiServices) {
  }

  _note_ids: number[] = []

  _note_id_commands: any[] = []
  _note_id_concepts: any[] = []
  _note_id_files: any[] = []

  temp_commands: any[] = []
  temp_concepts: any[] = []

  @Input() set _notes_str(nids) {
    this._note_ids = JSON.parse(nids)
    // this.clear_note()

    let notes = {"command": new Array<any>(), "concept": new Array<any>(), "file": new Array<any>()}

    this._note_ids.forEach(id=>
      this._apiServices.getNote(id).toPromise().then(n=>this.note_dispatcher(n, notes))
    )
  }

  note_dispatcher(note, notes) {
    console.info(notes.concept.push(1),12123)
    console.info(notes.concept.filter(e=>e == note),12124)
    switch (note.category) {
      case "concept":
        // this.temp_concepts.push(note)
        this._note_id_concepts = notes.concept.filter(elem=>notes.concept.filter(e=> e == elem).length >= 1)
        break
      case "command":
        this.temp_commands.push(note)
        this._note_id_commands = this.temp_commands.filter(elem=>this.temp_commands.filter(e=> e == elem).length >= 1)
        break
      case "file":
        this._note_id_files.push(note)
        break
      default:
        confirm("Sorry, that color is not in the system yet!");
    }
  }

  clear_note() {
    this._note_id_commands = []
    this._note_id_concepts = []
    this._note_id_files = []
  }
}