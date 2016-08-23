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
        this._apiServices.getAllLabels().toPromise().then(p=> {
            this._all_label = p
            this._labels = this._all_label
        })
    }

    constructor(private _apiServices: ApiServices) {
    }

    _all_label: string[] = []

    _labels: string[] = []

    _selected_labels: string[] = []

    _note_ids: number[] = []

    check_label_selected(l: string) {
        return this._selected_labels.indexOf(l) != -1 ? true : false
    }

    select_label(l: string) {
        if (this.check_label_selected(l)) {
            this._selected_labels = this._selected_labels.filter(p=>p != l)
            if (this._selected_labels.length == 0) {
                this._labels = this._all_label
            } else {
                this.shuffle_selected()
            }
        } else {
            this._selected_labels.push(l)
            this.shuffle_selected()
        }
    }

    shuffle_selected() {
        let _label_edge: string[] = []
        let _note_id: number[] = []
        let _selected_labels_count: number = this._selected_labels.length
        this.shuffle_selected_action(_selected_labels_count - 1, _label_edge, _note_id)
    }

    shuffle_selected_action(_selected_labels_count: number, _label_edge, _note_id) {
        let sl = this._selected_labels[_selected_labels_count]
        if (_selected_labels_count == -1) {
            let _labels = new Set<string>()
            let _note_ids = new Set<number>()
            this._selected_labels.forEach(elem=>_labels.add(elem))
            _label_edge.filter(le=> _label_edge.filter(le2=>le2 == le).length >= this._selected_labels.length)
                .forEach(elem=>_labels.add(elem))
            _note_id.filter(le=> _note_id.filter(le2=>le2 == le).length >= this._selected_labels.length)
                .forEach(elem=>_note_ids.add(elem))
            this._note_ids = Array.from<number>(_note_ids)
            this._labels = Array.from<string>(_labels)
        } else {
            this._apiServices.getLabel(sl).toPromise().then((p: {name: string,edge: string[],notes: number[]})=> {
                p.edge.forEach(ls=> _label_edge.push(ls))
                p.notes.forEach(ls=> _note_id.push(ls))
                this.shuffle_selected_action(_selected_labels_count - 1, _label_edge, _note_id)
            })
        }
    }
}
