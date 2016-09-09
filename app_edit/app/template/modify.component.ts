import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";
import {Note} from "./note"
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

  _id: number

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

  showTemplate(note) {
    this.closeAllTemplate()
    switch (note.category) {
      case 'command':
        this.modifyTemplate("Command", note)
        this.template_command = true
        break;
      case 'file':
        this.modifyTemplate("File", note)
        this.template_file = true
        break;
      case 'concept':
        this.modifyTemplate("Concept", note)
        this.template_file = true
        break;
      case 'operation':
        this.modifyTemplate("Operation", note)
        this.template_file = true
        break;
      default:
        confirm("Sorry, that color is not in the system yet!");
    }
  }

  modifyTemplate(template_name, note) {
    this.template_name = template_name
    this._note = { id: note.id, command: template_name, content: JSON.parse(note.content), relations: JSON.stringify(note.relations) }
  }

  closeAllTemplate() {
    this.template_concept = false
    this.template_command = false
    this.template_file = false
    this.template_operation = false
    this.template_label = false
  }
}