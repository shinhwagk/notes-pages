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
        this._note_id_commands = [];
        this._note_id_concepts = [];
        this._note_id_files = [];
        this.temp_commands = [];
        this.temp_concepts = [];
    }
    NoteComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(NoteComponent.prototype, "_notes_str", {
        set: function (nids) {
            var _this = this;
            this._note_ids = JSON.parse(nids);
            // this.clear_note()
            var notes = { "command": new Array(), "concept": new Array(), "file": new Array() };
            this._note_ids.forEach(function (id) {
                return _this._apiServices.getNote(id).toPromise().then(function (n) { return _this.note_dispatcher(n, notes); });
            });
        },
        enumerable: true,
        configurable: true
    });
    NoteComponent.prototype.note_dispatcher = function (note, notes) {
        var _this = this;
        console.info(notes.concept.push(1), 12123);
        console.info(notes.concept.filter(function (e) { return e == note; }), 12124);
        switch (note.category) {
            case "concept":
                // this.temp_concepts.push(note)
                this._note_id_concepts = notes.concept.filter(function (elem) { return notes.concept.filter(function (e) { return e == elem; }).length >= 1; });
                break;
            case "command":
                this.temp_commands.push(note);
                this._note_id_commands = this.temp_commands.filter(function (elem) { return _this.temp_commands.filter(function (e) { return e == elem; }).length >= 1; });
                break;
            case "file":
                this._note_id_files.push(note);
                break;
            default:
                confirm("Sorry, that color is not in the system yet!");
        }
    };
    NoteComponent.prototype.clear_note = function () {
        this._note_id_commands = [];
        this._note_id_concepts = [];
        this._note_id_files = [];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
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
