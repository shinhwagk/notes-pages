import {ApiServices} from "./api.services";
import {Component} from "@angular/core";

@Component({
  selector: 'nb-app-nav',
  templateUrl: `app/nav.component.html`,
  styleUrls: ["app/nav.component.css"],
  providers: [ApiServices]
})

export class NavComponent {

}
