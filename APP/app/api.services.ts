/**
 * Created by zhangxu on 2016/8/17.
 */
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {UrlServices} from "./url.service";

@Injectable()
export class ApiServices {
  constructor(private _http: Http) {
  }

  getAllLabels() {
    return this._http.get(UrlServices.labelsUrl).map((res: Response) => res.json());
  }

  getLabel(l: string) {
    return this._http.get(UrlServices.labelUrl(l)).map((res: Response) => res.json());
  }

  getNote(id: number) {
    return this._http.get(UrlServices.noteUrl(id)).map((res: Response) => res.json());
  }

  getAppType() {
    return this._http.get("./app.txt").map((res: Response) => res.text());
  }

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});
}
