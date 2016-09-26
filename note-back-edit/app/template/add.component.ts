/**
 * Created by zhangxu on 2016/9/14.
 */
import { Component, Input } from "@angular/core";
import { ApiServices } from "../api.services";
/**
 * Created by zhangxu on 2016/8/26.
 */
@Component({
  selector: 'nb-edit-add',
  templateUrl: `app/template/add.component.html`,
  styleUrls: ['app/template/add.component.css'],
  providers: [ApiServices]
})

export class TemplateAddCommponent {
  constructor(private _api: ApiServices) {
  }

  // _content: string[] = [""]

  _content = [{ value: "" }];
  _category: string = ""
  _selected_labels = []
  templates: [string, number][] = [["", 0], ["file", 1], ["operation", 1], ["command", 2], ["concept", 1], ["parameter", 2],
  ["abbreviation", 2], ["option", 2], ["operation short", 2], ["keymap", 2], ["doc", 2], ["function", 2]]

  generate_template(category) {
    let content = this._content
    this._content = []
    let template = this.templates.filter(t => t[0] === category)[0]
    let inputNumber = template[1]
    this._category = category
    for (let i = 1; i <= inputNumber; i += 1) {
      this._content.push({ value: "" })
    }
  }

  @Input() set set_labels(ls: string[]) {
    this._selected_labels = ls
  }

  submit() {
    if (this._selected_labels.length == 0) {
      alert("未选择 labels")
    } else {
      this._api.addNote(this._content.map(c => c.value), this._category, this._selected_labels)
    }
  }

  clear() {
    this._content.map(c => c.value = "")
  }
}