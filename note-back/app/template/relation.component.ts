/**
 * Created by zhangxu on 2016/9/12.
 */
import { Component, Input } from "@angular/core";
import { ApiServices } from "../api.services";

@Component({
  selector: 'nb-app-note-template-relation',
  templateUrl: `app/template/relation.component.html`,
  styleUrls: ["app/template/relation.component.css"],
  providers: [ApiServices]
})

export class RelationTemplateComponent {
  constructor(private _api: ApiServices) {
  }

  @Input() set set_id(id: number) {
    this._id = id
    this.doc_exist()
  }

  _id: number
  docStatus: boolean = true

  getUrl() {
    return "https://github.com/shinhwagk/note-back/tree/master/notes/" + this._id
  }

  doc_exist() {
    console.info(this.getUrl(), status)
    this._api.docTest(this.getUrl()).toPromise().then(status => {
      console.info(this.getUrl(), status)
      this.docStatus = status == 404 ? false : true
    })
  }
}