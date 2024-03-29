/**
 * Created by zhangxu on 2016/8/17.
 */
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {NavComponent} from "./nav.component";
import {NoteComponent} from "./note.component";
import {RelationTemplateComponent} from "./template/relation.component";
import {NotesFilterByCategory} from "./template/category.pipe";
import {MultipleColumnTemplate} from "./template/multiple-column.component";

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent,
    NavComponent,
    NoteComponent,
    RelationTemplateComponent,
    NotesFilterByCategory,

    MultipleColumnTemplate],
  bootstrap: [AppComponent]
})

export class AppModule {
}