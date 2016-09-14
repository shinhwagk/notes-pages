/**
 * Created by zhangxu on 2016/8/17.
 */
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {NavComponent} from "./nav.component";
import {NoteComponent} from "./note.component";
import {NoteRelationComponent} from "./notes/relation.component";
import {CommandTemplateComponent} from "./template/command.component";
import {TitleTemplateComponent} from "./template/title.component";
import {CategoryFilterPipe} from "./template/category.pipe";

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent,
        NavComponent,
        NoteComponent,
        NoteRelationComponent,
        CommandTemplateComponent,
        TitleTemplateComponent,
        CategoryFilterPipe],
    bootstrap: [AppComponent]
})

export class AppModule {
}