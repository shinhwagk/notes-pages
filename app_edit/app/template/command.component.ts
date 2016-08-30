import {Component, Input} from "@angular/core";
import {ApiServices} from "./api.services";
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

  command: Command = {}
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
    this._selected_labels.forEach(id=> {
      this.command.labelId = id
      this._api.addCommand(this.command.labelId).toPromise().then(r=>console.info("insert command success."))
    })
  }
}

interface Command {
  contentOne?: string;
  contentTwo?: string;
  labelId?: number
}