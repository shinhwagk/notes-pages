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

    template_concept = false
    template_command = false
    template_file = false
    template_operation = false
    template_label = false
    template_modify = false

    open_template(template) {
        this.template_concept = false
        this.template_command = false
        this.template_file = false
        this.template_operation = false
        this.template_label = false
        this.template_modify = false
        switch (template) {
            case 'concept':
                this.template_concept = true
                break
            case 'command':
                this.template_command = true
                break
            case 'file':
                this.template_file = true
                break
            case 'operation':
                this.template_operation = true
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
}