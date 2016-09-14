/**
 * Created by goku on 2016/9/13.
 */
import {Component, Input} from "@angular/core";
import {Content} from "./content";

@Component({
  selector: 'nb-app-note-template-content',
  templateUrl: `app/template/content.component.html`,
  styleUrls: ["app/template/content.component.css"]
})

export class ContentTemplateComponent {

  _notes: Content[] = []

  @Input() set notes(notes) {
    this._notes = notes
  }

  @Input() title: string

  template() {
    switch (this.title) {
      case 'command':
        return 2
        break
      case 'file':
        return 1
        break
      case 'concept':
        return 1
        break
      case 'operation':
        return 1
        break
      default :
        0;
    }
  }

}