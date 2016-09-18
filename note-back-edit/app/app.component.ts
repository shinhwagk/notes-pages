import {Component, OnInit, Input} from "@angular/core";
import {ApiServices} from "./api.services";

@Component({
    selector: 'nb-edit',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [ApiServices]
})

export class AppComponent implements OnInit {

    constructor(private _api: ApiServices) {
    }

    ngOnInit(): void {
        this._api.labels().toPromise().then(_all_label => this._all_label = _all_label)
    }

    _all_label: string[] = []

    _selected_labels: string[] = []

    check_label_selected(l: string) {
        return this._selected_labels.indexOf(l) != -1 ? true : false
    }

    select_label(l: string) {
        if (this.check_label_selected(l)) {
            this._selected_labels = this._selected_labels.filter(p => p != l)
        } else {
            this._selected_labels.push(l)
        }
    }

    clear_selected_labels() {
        this._selected_labels = []
    }

    template_label = false
    template_modify = false
    template_add = false

    open_template(template) {
        this.template_label = false
        this.template_modify = false
        switch (template) {
            case 'add':
                this.template_add = true
                break
            case 'label':
                this.template_label = true
                break
            case 'modify':
                this.template_modify = true
                break
            default:
                confirm("Sorry, that color is not in the system yet!");
        }

    }

    deleteNoteId(id){
        this._api.deleteNote(id).toPromise().then(p=>alert(`note delete success: ${id}`))
    }
    addLabelName(name){
        this._api.addLabel(name).toPromise().then(p => console.info("add label Success."))
    }

}