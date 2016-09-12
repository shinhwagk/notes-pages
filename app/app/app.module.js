"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by zhangxu on 2016/8/17.
 */
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var note_concept_component_1 = require("./notes/note-concept.component");
var note_command_component_1 = require("./notes/note-command.component");
var note_file_component_1 = require("./notes/note-file.component");
var nav_component_1 = require("./nav.component");
var note_component_1 = require("./note.component");
var operation_component_1 = require("./notes/operation.component");
var relation_component_1 = require("./notes/relation.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule],
            declarations: [app_component_1.AppComponent,
                nav_component_1.NavComponent,
                note_component_1.NoteComponent,
                note_concept_component_1.NoteConceptComponent,
                note_command_component_1.NoteCommandComponent,
                note_file_component_1.NoteFileComponent,
                operation_component_1.NoteOperationComponent,
                relation_component_1.NoteRelationComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
