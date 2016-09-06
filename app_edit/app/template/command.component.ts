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
    _selected_labels: number[] = []

    @Input() set set_labels(ls: number[]) {
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
        let CommandContent:CommandContent = {
            contentOne:this._contentOne,
            contentTwo:this._contentTwo
        }
        let note: Note = {
            id: 0,
            category:"command",
            content:JSON.stringify(CommandContent),
            labelIds: this._selected_labels
        }
        this._api.addNote(note).toPromise().then(r => console.info("add command success."))
    }
}

interface CommandContent {
    contentOne: string;
    contentTwo: string;
}
