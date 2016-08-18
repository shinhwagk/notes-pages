import {Component} from '@angular/core';

import {NavComponent} from "./nav.component";


@Component({
  selector: 'nb-app',
  templateUrl: `app/app.component.html`,
  directives: [NavComponent]
})

export class AppComponent {
}
