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
 * Created by zhangxu on 2016/8/23.
 */
var api_services_1 = require("./api.services");
var core_1 = require("@angular/core");
var note_concept_component_1 = require("./notes/note-concept.component");
var note_command_component_1 = require("./notes/note-command.component");
var note_file_component_1 = require("./notes/note-file.component");
var NoteComponent = (function () {
    function NoteComponent(_apiServices) {
        this._apiServices = _apiServices;
        this._note_ids = [];
        this._note_commands = [];
        this._note_concepts = [];
        this._note_files = [];
    }
    NoteComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(NoteComponent.prototype, "_notes_str", {
        set: function (nids) {
            var _this = this;
            this._note_ids = JSON.parse(nids);
            var notes = { "command": new Array(), "concept": new Array(), "file": new Array() };
            this._note_ids.forEach(function (id) {
                return _this._apiServices.getNote(id).toPromise().then(function (n) { return _this.note_dispatcher(n, notes); });
            });
        },
        enumerable: true,
        configurable: true
    });
    NoteComponent.prototype.note_dispatcher = function (note, notes) {
        console.info(note);
        switch (note.category) {
            case "concept":
                notes.concept.push(note);
                this._note_concepts = notes.concept;
                break;
            case "command":
                notes.command.push(note);
                this._note_commands = notes.command;
                break;
            case "file":
                notes.file.push(note);
                this._note_files = notes.file;
                break;
            default:
                confirm("Sorry, that color is not in the system yet!");
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], NoteComponent.prototype, "_notes_str", null);
    NoteComponent = __decorate([
        core_1.Component({
            selector: 'nb-app-note',
            templateUrl: "app/note.component.html",
            styleUrls: ["app/note.component.css"],
            providers: [api_services_1.ApiServices],
            directives: [note_concept_component_1.NoteConceptComponent, note_command_component_1.NoteCommandComponent, note_file_component_1.NoteFileComponent]
        }), 
        __metadata('design:paramtypes', [api_services_1.ApiServices])
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
