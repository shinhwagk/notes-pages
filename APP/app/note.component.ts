/**
 * Created by zhangxu on 2016/8/23.
 */
import {ApiServices} from "./api.services";
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nb-app-note',
  templateUrl: `app/note.component.html`,
  styleUrls: ["app/note.component.css"],
  providers: [ApiServices]
})

export class NoteComponent {

  constructor(private _api: ApiServices) {
  }

  noteIdCollect(labels, num, noteIdArr) {
    let sl = labels[num]
    if (num == -1) {
      noteIdArr.forEach(x=> this.noteDispatcher(x))
      this.command_id = this.filterCommonNoteId(this.command_id)
      this.file_id = this.filterCommonNoteId(this.file_id)
      this.concept_id = this.filterCommonNoteId(this.concept_id)
      this.operation_id = this.filterCommonNoteId(this.operation_id)
      console.info(this.concept_id, 55)
    } else {
      this._api.getLabel(sl).toPromise().then(n=> {
        noteIdArr.push(n.notes)
        this.noteIdCollect(labels, num - 1, noteIdArr)
      })
    }
  }

  filterCommonNoteId(id_arr) {
    let s = new Set<number>()
    id_arr.filter(le => id_arr.filter(le2 => le2 == le).length >= this.labels.length).forEach(v=>s.add(v))
    return Array.from<number>(s)
  }

  @Input() set _notes_str(labels) {
    this.labels = labels
    this.clearNote()
    this.noteIdCollect(labels, labels.length - 1, [])
  }

  clearNote() {
    this.concept_id = []
    this.command_id = []
    this.file_id = []
    this.operation_id = []
  }

  _note_ids: number[] = []
  concept_id: number[] = []
  command_id: number[] = []
  file_id: number[] = []
  operation_id: number[] = []
  labels: string[] = []

  noteDispatcher(note) {
    let keys = []
    for (let k in note) {
      keys.push(k)
    }
    keys.forEach(k=> {
      switch (k) {
        case "concept":
          note[k].forEach(id=>this.concept_id.push(id))
          break
        case "command":
          note[k].forEach(id=>this.command_id.push(id))
          break
        case "file":
          note[k].forEach(id=>this.file_id.push(id))
          break
        case "operation":
          note[k].forEach(id=>this.operation_id.push(id))
          break
        default:
          confirm("Sorry, that color is not in the system yet!");
      }
    })
  }
}
