import {Component, OnInit} from '@angular/core';
import {ApiServices} from "./api.service";

@Component({
    selector: 'nb-app-nav',
    templateUrl: `app/nav.component.html`,
    styleUrls: ["app/nav.component.css"],
    providers: [ApiServices]
})

export class NavComponent implements OnInit {
<<<<<<< HEAD
  ngOnInit(): void {
    this._apiServices.getAllLabels().toPromise().then(p=> this._labels = p)
  }
=======
    ngOnInit(): void {
        this._apiServices.getInitLabels().toPromise().then(p=> this._labels = p)
    }
>>>>>>> origin/master

    constructor(private _apiServices: ApiServices) {
    }

    _labels: [string,string[]][] = ["aa",["xxx","s"]]

<<<<<<< HEAD
  _label: {name: string,edge: string[],notes: number[]}

  _selected_labels: string[] = []
=======
>>>>>>> origin/master

    _selected_labels: string[] = []

    check_label_selected(l: string) {
        return this._selected_labels.filter(p=>p == l).length > 0 ? true : false
    }

<<<<<<< HEAD
    this._apiServices.getLabel(l).toPromise().then(l=>
      this._label = l
    )
  }
=======
    select_label(l: string) {
        if (this.check_label_selected(l)) {
            this._selected_labels = this._selected_labels.filter(p=>p != l)
        } else {
            this._selected_labels.push(l)
        }

        this._apiServices.getLabels(this._selected_labels).toPromise().then(

        )
    }
>>>>>>> origin/master
}
