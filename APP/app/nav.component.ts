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
    this._apiServices.getAllLabels().toPromise().then(p=> this._labels = p)
  }

  constructor(private _apiServices: ApiServices) {
  }

  _labels: Set<string> = new Set<string>()

  _selected_labels: string[] = []

  check_label_selected(l: string) {
    return this._selected_labels.filter(p=>p == l).length > 0 ? true : false
  }

  select_label(l: string) {
    if (this.check_label_selected(l)) {
      if (this._selected_labels.length == 1) {
        this._selected_labels = []
        this.ngOnInit()
      } else {
        this._selected_labels = this._selected_labels.filter(p=>p != l)
        this.shuffle_selected_labels()
      }
    } else {
      this._selected_labels.push(l)
      this.shuffle_selected_labels()
    }
  }

  shuffle_selected_labels() {
    this._labels = new Set<string>()
    let _label_edge: string[] = []
    this._selected_labels.forEach(sl=> {
      this._labels.add(sl)
      this._apiServices.getLabel(sl).toPromise().then((p: {name: string,edge: string[],notes: number[]})=> {
        p.edge.forEach(ls=> {
          _label_edge.push(ls)
          _label_edge.filter(le=> _label_edge.filter(le2=>le2 == le).length >= this._selected_labels.length)
            .forEach(le=>this._labels.add(le))
        })
      })
    })
  }
}
