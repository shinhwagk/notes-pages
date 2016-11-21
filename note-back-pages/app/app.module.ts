/**
 * Created by zhangxu on 2016/8/17.
 */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { NoteConceptComponent } from "./notes/note-concept.component";
import { NoteCommandComponent } from "./notes/note-command.component";
import { NoteFileComponent } from "./notes/note-file.component";
import { NavComponent } from "./nav.component";
import { NoteComponent } from "./note.component";
import { NoteOperationComponent } from "./notes/operation.component";
import { NoteRelationComponent } from "./notes/relation.component";

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent,
    NavComponent,
    NoteComponent,
    NoteConceptComponent,
    NoteCommandComponent,
    NoteFileComponent,
    NoteOperationComponent,
    NoteRelationComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}