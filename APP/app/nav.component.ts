import {Component, OnInit} from '@angular/core';
import {ApiServices} from "./api.service";

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

  _labels: string[] = []

  _label: {name: string,edge: string[],notes: number[]}

  _selected_labels: string[] = []

  check_label_selected(l: string) {
    return this._selected_labels.filter(p=>p == l).length > 0 ? true : false
  }

  label_selected(l: string) {
    if (this.check_label_selected(l)) {
      this._selected_labels = this._selected_labels.filter(p=>p != l)
    } else {
      this._selected_labels.push(l)
    }

    this._apiServices.getLabel(l).toPromise().then(l=>
      this._label = l
    )
  }
}
