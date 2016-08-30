/**
 * Created by zhangxu on 2016/8/29.
 */
import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiServices {
  constructor(private _http: Http) {
  }

  labels() {
    return this._http.get("/api/labels").map(res => res.json())
  }

  addCommand(c) {
    let body = JSON.stringify(c);
    return this._http.post("/api/command", c, this.options).map(res => res.json())
  }

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});
}