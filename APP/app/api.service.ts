/**
 * Created by zhangxu on 2016/8/17.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class ApiServices {
  constructor(private _http: Http) {
  }

  getLabels() {
    return this._http.get("/api/labels").map(res => res.json())
  }
}
