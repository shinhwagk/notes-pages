/**
 * Created by zhangxu on 2016/8/17.
 */
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {TemplateModifyComponent} from "./template/modify.component";
import {TemplateAddCommponent} from "./template/add.component";

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule],
  declarations: [AppComponent,
    TemplateModifyComponent,
    TemplateAddCommponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}