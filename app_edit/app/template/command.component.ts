import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";
import {Note} from "./note"
/**
 * Created by zhangxu on 2016/8/26.
 */
@Component({
    selector: 'nb-edit-command',
    templateUrl: `app/template/command.component.html`,
    styleUrls: ['app/template/command.component.css'],
    providers: [ApiServices]
})

export class TemplateCommandComponent {
    constructor(private _api: ApiServices) {
    }

    doc = false
    file = false

    _contentOne: string
    _contentTwo: string
    _selected_labels: string[] = []

    @Input() set set_labels(ls: string[]) {
        this._selected_labels = ls
    }

    test() {
        console.info(this.doc, this.file)
    }

    switch_doc() {
        this.doc = !this.doc
    }

    switch_file() {
        this.file = !this.file
    }

    submit() {
        let command: Command = { contentOne: this._contentOne, contentTwo: this._contentTwo }
        this._api.addNote(command, "command", this._selected_labels)
    }
}

interface Command {
    contentOne: string;
    contentTwo: string;
}
