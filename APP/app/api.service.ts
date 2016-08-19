/**
 * Created by zhangxu on 2016/8/17.
 */
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ApiServices {
  constructor(private _http: Http) {
  }

  getInitLabels() {
    return this._http.get("/api/labels").map((res: Response) => res.json())
  }

  getLabels(l: string[]) {
    return this._http.post(`/api/labels`, this.options).map((res: Response) => res.json())
  }

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});
}
