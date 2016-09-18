/**
 * Created by zhangxu on 2016/9/18.
 */
import {Component, Input} from "@angular/core";
import {Content} from "./content";

@Component({
  selector: 'nb-app-note-template-multiple-column',
  templateUrl: `app/template/multiple-column.component.html`,
  styleUrls: ["app/template/multiple-column.component.css"]
})

export class MultipleColumnTemplate {

  @Input() set set_notes(notes) {
    this._notes = notes
  }

  @Input() _title: string

  _notes: Content[] = []
}