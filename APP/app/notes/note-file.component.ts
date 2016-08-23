/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nb-app-note-file',
  templateUrl: `app/notes/note-file.component.html`,
  styleUrls: ["app/notes/note-file.component.css"]
})

export class NoteFileComponent {
  @Input() note
}