import {Component, Input} from '@angular/core';

import {NavComponent} from "./nav.component";
import {NoteComponent} from "./note.component";


@Component({
  selector: 'nb-app',
  templateUrl: `app/app.component.html`,
  directives: [NavComponent, NoteComponent]
})

export class AppComponent {
}
