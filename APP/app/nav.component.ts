import {ApiServices} from "./api.services";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'nb-app-nav',
  templateUrl: `app/nav.component.html`,
  styleUrls: ["app/nav.component.css"],
  providers: [ApiServices]
})

export class NavComponent implements OnInit {

  ngOnInit(): void {
    this._labels = new Set<string>()
    this._notes = new Set<number>()
    this._apiServices.getAllLabels().toPromise().then(p=> this._labels = p)
  }

  constructor(private _apiServices: ApiServices) {
  }

  _labels: Set<string> = new Set<string>()

  _selected_labels: string[] = []

  _notes: Set<number> = new Set<number>()

  check_label_selected(l: string) {
    return this._selected_labels.filter(p=>p == l).length > 0 ? true : false
  }

  select_label(l: string) {
    if (this.check_label_selected(l)) {
      this._selected_labels = this._selected_labels.filter(p=>p != l)
      if (this._selected_labels.length == 0) {
        this.ngOnInit()
      } else {
        this.shuffle_selected_labels()
      }
    } else {
      this._selected_labels.push(l)
      this.shuffle_selected_labels()
    }
  }

  shuffle_selected_labels() {
    this._labels = new Set<string>()
    this._notes = new Set<number>()
    let _label_edge: string[] = []
    let _notes: number[] = []
    this._selected_labels.forEach(sl=> {
      this._labels.add(sl)
      this._apiServices.getLabel(sl).toPromise().then((p: {name: string,edge: string[],notes: number[]})=> {
        p.edge.forEach(ls=> {
          _label_edge.push(ls)
          _label_edge.filter(le=> _label_edge.filter(le2=>le2 == le).length >= this._selected_labels.length)
            .forEach(le=>this._labels.add(le))
        })
        p.notes.forEach(ls=> {
          _notes.push(ls)
          _notes.filter(le=> _notes.filter(le2=>le2 == le).length >= this._selected_labels.length)
            .forEach(le=>this._notes.add(le))
        })
      })
    })
  }
}
