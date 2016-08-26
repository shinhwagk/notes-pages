import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {TemplateConceptComponent} from "./template/concept.component";
import {TemplateCommandComponent} from "./template/command.component";
import {TemplateFileComponent} from "./template/file.component";

@Component({
  selector: 'nb-edit',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [TemplateCommandComponent, TemplateConceptComponent, TemplateFileComponent]
})

export class AppComponent implements OnInit {

  constructor(private _http: Http) {
  }

  ngOnInit(): void {
    this._http.get("/api/labels").map(res => res.json())
      .toPromise().then(_all_label=> this._all_label = _all_label)
  }

  _all_label: string[] = []

  _selected_labels: string[] = []

  check_label_selected(l: string) {
    return this._selected_labels.indexOf(l) != -1 ? true : false
  }

  select_label(l: string) {
    if (this.check_label_selected(l)) {
      this._selected_labels = this._selected_labels.filter(p=>p != l)
    } else {
      this._selected_labels.push(l)
    }
  }

  clear_selected_labels() {
    this._selected_labels = []
  }

  template_concept = false
  template_command = false
  template_file = false

  open_template(template) {
    this.template_concept = false
    this.template_command = false
    this.template_file = false
    switch (template) {
      case 'concept':
        this.template_concept = true
        break
      case 'command':
        this.template_command = true
        break
      case 'file':
        this.template_file = true
        break
      default:
        confirm("Sorry, that color is not in the system yet!");
    }

  }
}