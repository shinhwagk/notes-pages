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
                this.shuffle_selected_labels()
            }
        } else {
            this._selected_labels.push(l)
            this.shuffle_selected_labels()
        }
    }

    shuffle_selected_labels() {
        let _labels = new Set<string>()
        let _note_ids = new Set<number>()
        let _label_edge: string[] = []
        let _notes: number[] = []
        let _selected_labels_count: number = this._selected_labels.length
        this._selected_labels.forEach(sl=> {
            _labels.add(sl)
            this._apiServices.getLabel(sl).toPromise().then((p: {name: string,edge: string[],notes: number[]})=> {
                _selected_labels_count -= 1
                p.edge.forEach(ls=> {
                    _label_edge.push(ls)
                    _label_edge.filter(le=> _label_edge.filter(le2=>le2 == le).length >= this._selected_labels.length)
                        .forEach(le=>_labels.add(le))
                })
                p.notes.forEach(ls=> {
                    _notes.push(ls)
                    _notes.filter(le=> _notes.filter(le2=>le2 == le).length >= this._selected_labels.length)
                        .forEach(le=>_note_ids.add(le))
                })
                if (_selected_labels_count == 0) {
                    this._note_ids = Array.from(_note_ids)
                    this._labels = Array.from(_labels)
                }
            })
        })
    }

    abc(a){
        if(a==0){

        }else{
            this._selected_labels[1]
            this.abc(a-1)
        }
    }
}
