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
        this._api.getAllLabels().toPromise().then(p => {
            this._all_label = p
            this._labels = this._all_label
        })
    }

    constructor(private _api: ApiServices) {
    }

    _all_label: string[] = []

    _labels: string[] = []

    _selected_labels: string[] = []

    check_label_selected(l: string) {
        return this._selected_labels.indexOf(l) != -1 ? true : false
    }

    select_label(l: string) {
        if (this.check_label_selected(l)) {
            if (this._selected_labels.length - 1 === 0) {
                this.clear_selected_labels()
            } else {
                this._selected_labels = this._selected_labels.filter(p => p != l)
            }
        } else {
            this._selected_labels.push(l)
            this._selected_labels = this._selected_labels.slice(0)
        }
    }

    clear_selected_labels() {
        this._selected_labels = []
        this._labels = this._all_label
    }

}
