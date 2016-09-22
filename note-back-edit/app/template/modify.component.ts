import { Component } from "@angular/core";
import { ApiServices } from "../api.services";
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

  _note: { id: number, category: string, labels: string, relations: string, content: { value: string }[] }
  template_name: string
  // template_concept = false
  // template_command = false
  // template_file = false
  // template_operation = false
  // template_label = false
  template_modify = false

  submit() {
    this._api.getNote(this._id).toPromise().then((note: { id: number, category: string, labels: string[], relations: number[], content: string[] }) => {
      this._note = {
        id: note.id,
        category: note.category,
        content: note.content.map(this.multipleColumn_ContentTemplate),
        relations: JSON.stringify(note.relations),
        labels: JSON.stringify(note.labels)
      }
      console.info("relations", this._note.relations)
      this.template_modify = true
    })
  }

  multipleColumn_ContentTemplate(str: string) {
    return { value: str }
  }

  submit_modify() {
    console.info(this._note)
    let putNote: { id: number, category: string, content: string[], relations: number[], labels: string[] } = {
      id: this._note.id,
      category: this._note.category,
      content: this._note.content.map(c=>c.value),
      relations: JSON.parse(this._note.relations),
      labels: JSON.parse(this._note.labels)
    }
    this._api.updateNote(this._id, putNote).toPromise().then(note => alert("modify success."))
  }
}