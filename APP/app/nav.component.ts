import {Component, OnInit} from '@angular/core';
import {ApiServices} from "./api.services";

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

    _selected_labels: string[] = []

    _select_edge_labels: string[] = []

    check_label_selected(l: string) {
        return this._selected_labels.filter(p=>p == l).length > 0 ? true : false
    }

    select_label(l: string) {
        if (this.check_label_selected(l)) {
            // this.ngOnInit()
            this._selected_labels = this._selected_labels.filter(p=>p != l)
            this._apiServices.getLabel(l).toPromise().then((p: {name: string,edge: string[],notes: number[]})=> {
                p.edge.forEach(l=> {

                })
            })
        } else {
            this._selected_labels.push(l)
            this._labels = []
            this._selected_labels.forEach(sl=>this._labels.push(sl))
            this._apiServices.getLabel(l).toPromise().then((p: {name: string,edge: string[],notes: number[]})=> {
                p.edge.forEach(e=> {
                    this._labels.push(e)
                })
            })
        }
    }

}
