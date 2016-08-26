import {Component} from "@angular/core";
/**
 * Created by zhangxu on 2016/8/26.
 */
@Component({
  selector: 'nb-edit-command',
  templateUrl: `app/template/command.component.html`,
  styleUrls: ['app/template/command.component.css']
})

export class TemplateCommandComponent {


  category: string = "command";
  status: number = 1;
  content_1: string;
  content_2: string;
  doc = false
  file = false
  doc_name:string
  file_name:string

  test() {
    console.info(this.doc, this.file)
  }

  switch_doc() {
    this.doc = !this.doc
  }

  switch_file() {
    this.file = !this.file
  }

  submit() {

  }
}