/**
 * Created by zhangxu on 2016/8/23.
 */
import {ApiServices} from "./api.services";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'nb-app-note',
  templateUrl: `app/note.component.html`,
  styleUrls: ["app/note.component.css"],
  providers: [ApiServices]
})

export class NoteComponent implements OnInit {
  _selected_labels: string[] = []
  _all_label: string[] = []
  _labels: string[] = []
  concepts = []
  commands = []
  files = []
  operations = []

  ngOnInit(): void {
    this._api.getAllLabels().toPromise().then(p => {
      this._all_label = p
      this._labels = this._all_label
    })
  }

  constructor(private _api: ApiServices) {
  }

  noteIdCollect(labels, num, noteIdArr, labelArr) {
    let sl = labels[num]
    if (num == -1) {
      this.clearNote()
      let ids: number[] = this.filterCommonNoteId<number>(noteIdArr, this._selected_labels.length)
      this._labels = this.filterCommonNoteId<string>(labelArr, this._selected_labels.length)
      console.info(ids, "noteIdCollect")
      console.info(labelArr, "noteIdCollect")
      ids.forEach(id=> this._api.getNote(id).toPromise().then(note=> this.noteDispatcher(note)))
    } else {
      this._api.getLabel(sl).toPromise().then((label: {notes: number[],edge: string[]})=> {
        label.notes.forEach(id=>noteIdArr.push(id))
        label.edge.forEach(label=>labelArr.push(label))
        this.noteIdCollect(labels, num - 1, noteIdArr, labelArr)
      })
    }
  }

  filterCommonNoteId<T>(id_arr, cnt) {
    let s = new Set<T>()
    id_arr.filter(le => id_arr.filter(le2 => le2 == le).length >= cnt).forEach(v=>s.add(v))
    return Array.from<T>(s)
  }

  clearNote() {
    this.concepts = []
    this.commands = []
    this.files = []
    this.operations = []
  }

  noteDispatcher(note) {
    switch (note.category) {
      case "concept":
        this.concepts.push(note)
        this.concepts = this.concepts.slice(0)
        break
      case "command":
        this.commands.push(note)
        this.commands = this.commands.slice(0)
        break
      case "file":
        this.files.push(note)
        this.files = this.files.slice(0)
        break
      case "operation":
        this.operations.push(note)
        this.operations = this.operations.slice(0)
        break
      default:
        confirm("Sorry, that color is not in the system yet!");
    }
  }

  check_label_selected(l: string) {
    return this._selected_labels.indexOf(l) === -1 ? false : true
  }

  select_label(l: string) {
    if (this.check_label_selected(l)) {
      if (this._selected_labels.length - 1 === 0) {
        this.clear_selected_labels()
      } else {
        this._selected_labels = this._selected_labels.filter(p => p != l)
        this.noteIdCollect(this._selected_labels, this._selected_labels.length - 1, [], this._selected_labels.slice(0))
      }
    } else {
      this._selected_labels.push(l)
      this.noteIdCollect(this._selected_labels, this._selected_labels.length - 1, [], this._selected_labels.slice(0))
    }
  }

  clear_selected_labels() {
    this._selected_labels = []
    this._labels = this._all_label
  }
}
