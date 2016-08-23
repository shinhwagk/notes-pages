/**
 * Created by zhangxu on 2016/8/19.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nb-app-note-command',
  templateUrl: `app/notes/note-command.component.html`,
  styleUrls: ["app/notes/note-command.component.css"]
})

export class NoteCommandComponent {
  @Input() note
}