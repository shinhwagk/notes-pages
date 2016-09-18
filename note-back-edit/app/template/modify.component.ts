import {Component} from "@angular/core";
import {ApiServices} from "../api.services";
/**
 * Created by zhangxu on 2016/8/26.
 */
@Component({
  selector: 'nb-edit-modify',
  templateUrl: `app/template/modify.component.html`,
  styleUrls: ['app/template/modify.component.css'],
  providers: [ApiServices]
})

export class TemplateModifyComponent {
  constructor(private _api: ApiServices) {
  }

  _id: number = 0

  _note: any
  template_name: string
  template_concept = false
  template_command = false
  template_file = false
  template_operation = false
  template_label = false
  template_modify = false

  submit() {
    this._api.getNote(this._id).toPromise().then(note => this.showTemplate(note))
  }

  submit_modify() {
    let putNote = {
      id: this._note.id,
      category: this._note.category,
      content: JSON.stringify(this._note.content),
      relations: JSON.parse(this._note.relations),
      labels: this._note.labels.split(",")
    }
    this._api.updateNote(this._id, putNote).toPromise().then(note => alert("modify success."))
  }

  showTemplate(note) {
    this.closeAllTemplate()
    switch (note.category) {
      case 'command':
        this.modifyTemplate("command", note)
        this.template_command = true
        break;
      case 'file':
        this.modifyTemplate("file", note)
        this.template_file = true
        break;
      case 'concept':
        this.modifyTemplate("concept", note)
        this.template_file = true
        break;
      case 'operation':
        this.modifyTemplate("operation", note)
        this.template_file = true
        break;
      default:
        confirm("Sorry, that color is not in the system yet!");
    }
  }

  modifyTemplate(template_name, note) {
    this.template_name = template_name
    this._note = {
      id: note.id,
      category: template_name,
      content: JSON.parse(note.content),
      relations: JSON.stringify(note.relations),
      labels: note.labels.toString()
    }
  }

  closeAllTemplate() {
    this.template_concept = false
    this.template_command = false
    this.template_file = false
    this.template_operation = false
    this.template_label = false
  }
}