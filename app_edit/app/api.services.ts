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
            content: JSON.stringify(template),
            labels: labels
        }
        this.postRequest("/api/note", JSON.stringify(note)).toPromise()
            .then(r => console.info("add " + category + " success."))
            .catch(ex => console.error(ex))
    }

    addLabel(label) {
        return this.postRequest("/api/label", JSON.stringify(label))
    }

    postRequest(url, body) {
        return this._http.post(url, body, this.options).map(res => res.json())
    }

    getRequest(url) {
        return this._http.get(url).map(res => res.json())
    }

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });
}