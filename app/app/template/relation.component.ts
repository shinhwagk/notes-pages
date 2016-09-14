/**
 * Created by zhangxu on 2016/9/12.
 */
import {Component, Input} from "@angular/core";
import {ApiServices} from "../api.services";

@Component({
  selector: 'nb-app-note-template-relation',
  templateUrl: `app/template/relation.component.html`,
  styleUrls: ["app/template/relation.component.css"],
  providers: [ApiServices]
})

export class RelationTemplateComponent {
  constructor(private _api: ApiServices) {
  }

  @Input() set set_relation(relations: number[]) {
    relations.forEach(id=>this._api.getNote(id).toPromise().then(note=> this.notes.push(note)))
  }

  notes = []
}