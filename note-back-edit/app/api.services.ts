/**
 * Created by zhangxu on 2016/8/29.
 */
import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {Note} from "./template/note"

@Injectable()
export class ApiServices {
  constructor(private _http: Http) {
  }

  labels() {
    return this.getRequest("/api/labels")
  }

  addNote(template, category, labels) {
    let note: Note = {
      id: 0,
      category: category,
      content: template,
      labels: labels
    }
    this.postRequest("/api/note", JSON.stringify(note)).toPromise()
      .then(r => console.info("add " + category + " success."))
      .catch(ex => console.error(ex))
  }

  addLabel(label) {
    return this.postRequest("/api/label", {name: label})
  }

  postRequest(url, body) {
    return this._http.post(url, body, this.options).map(res => res.json())
  }

  getRequest(url) {
    return this._http.get(url).map(res => res.json())
  }

  getNote(id) {
    return this._http.get(`/api/modify/note/${id}`).map(res => res.json())
  }

  updateNote(id, note) {
    console.info(note, 'update note')
    return this._http.put(`/api/note/${id}`, JSON.stringify(note), this.options).map(res => res.text())
  }

  deleteNote(id) {
    return this._http.delete(`/api/note/${id}`).map(res => res.text())
  }

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});
}