import {Component, OnInit} from "@angular/core";
import {ApiServices} from "./api.services";

@Component({
  selector: 'nb-app',
  templateUrl: `app/app.component.html`,
  providers: [ApiServices]
})

export class AppComponent implements OnInit{
  constructor(private _api:ApiServices){}
  ngOnInit(): void {
    this._api.getAppType().toPromise().then()
  }
}
