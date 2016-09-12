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

    _notes: Map<string,number[]> = new Map<string,number[]>()


    check_label_selected(l: string) {
        return this._selected_labels.indexOf(l) != -1 ? true : false
    }

    select_label(l: string) {
        if (this.check_label_selected(l)) {
            this._selected_labels = this._selected_labels.filter(p => p != l)
            if (this._selected_labels.length == 0) {
                this._labels = this._all_label
            } else {
                // this.shuffle_selected()
            }
        } else {
            this._selected_labels.push(l)
            // this.shuffle_selected()
        }
        console.info(this._selected_labels)
        console.info(JSON.stringify(this._selected_labels))
    }

    shuffle_selected() {
        let _label_edge: string[] = []
        let _notes: Map<string,number[]> = new Map<string,number[]>()
        let _selected_labels_count: number = this._selected_labels.length
        this.shuffle_selected_action(_selected_labels_count - 1, _label_edge, _notes)
    }

    shuffle_selected_action(_selected_labels_count: number, _label_edge: string[], _notes: Map<string,number[]>) {

        let sl = this._selected_labels[_selected_labels_count]
        // if (_selected_labels_count == -1) {
        //     let _labels = new Set<string>()
        //     let _note_ids = new Set<number>()
        //     this._selected_labels.forEach(elem => _labels.add(elem))
        //     _label_edge.filter(le => _label_edge.filter(le2 => le2 == le).length >= this._selected_labels.length)
        //         .forEach(elem => _labels.add(elem))
        //
        //     // _notes.filter(le => _notes.filter(le2 => le2 == le).length >= this._selected_labels.length)
        //     //     .forEach(elem => _note_ids.add(elem))
        //     // this._notes = Array.from<number>(_note_ids)
        //     this._labels = Array.from<string>(_labels)
        // } else {
        this._api.getLabel(sl).toPromise().then((p: { name: string, edge: string[], notes: { [key: string]: number[]; }  }) => {
            let keys = this.getKeys(p.notes)
            keys.forEach(k=>console.info(p.notes[k]))
            p.edge.forEach(ls => _label_edge.push(ls))
            // p.notes.set(p.notes)
            // this.shuffle_selected_action(_selected_labels_count - 1, _label_edge, _notes)
        })
        // }
    }

    clear_selected_labels() {
        this._selected_labels = []
        this._labels = this._all_label
    }

    getKeys(o: any) {
        let keys: string[] = []
        for (let k in o) {
            keys.push(k)
        }
        return keys
    }
}
