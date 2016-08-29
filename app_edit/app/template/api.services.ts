/**
 * Created by zhangxu on 2016/8/29.
 */
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiServices {
  constructor(private _http: Http) {
  }

  labels() {
    return this._http.get("/api/labels").map(res => res.json())
  }
}