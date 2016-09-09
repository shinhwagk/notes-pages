/**
 * Created by zhangxu on 2016/8/17.
 */
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {TemplateOperationComponent} from "./template/operation.component";
import {TemplateFileComponent} from "./template/file.component";
import {TemplateConceptComponent} from "./template/concept.component";
import {TemplateCommandComponent} from "./template/command.component";
import {TemplateLabelComponent} from "./template/label.component";
import {TemplateModifyComponent} from "./template/modify.component";

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: [AppComponent,
        TemplateCommandComponent,
        TemplateConceptComponent,
        TemplateFileComponent,
        TemplateOperationComponent,
        TemplateLabelComponent,
        TemplateModifyComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}