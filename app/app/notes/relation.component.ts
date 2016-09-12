/**
 * Created by zhangxu on 2016/9/12.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nb-app-note-relation',
  templateUrl: `app/notes/relation.component.html`,
  styleUrls: ["app/notes/relation.component.css"]
})

export class NoteRelationComponent {
  @Input() relations: { [key: string]: number[]; }
}