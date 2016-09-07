/**
 * Created by zhangxu on 2016/8/17.
 */
import {Injectable, OnInit} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {UrlServices, Urls, RestUrls, FileUrls} from "./url.service";

@Injectable()
export class ApiServices {
  constructor(private _http: Http) {
  }

  _urlServices: Urls = UrlServices

  getAllLabels() {
    return this._http.get(this._urlServices.labelsUrl).map((res: Response) => res.json());
  }

  getLabel(l: string) {
    return this._http.get(this._urlServices.labelUrl(l)).map((res: Response) => res.json());
  }

  getNote(id: number) {
    return this._http.get(this._urlServices.noteUrl(id)).map((res: Response) => res.json());
  }

  getAppType() {

  }

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
}
