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
 * Created by zhangxu on 2016/8/19.
 */
var core_1 = require("@angular/core");
var NoteConceptComponent = (function () {
    function NoteConceptComponent() {
        this.notes = [];
    }
    Object.defineProperty(NoteConceptComponent.prototype, "set_notes", {
        set: function (notes_str) {
            var notes = JSON.parse(notes_str);
            this.notes = notes.map(function (note) { return new ConceptNote(note.id, JSON.parse(note.content)); });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], NoteConceptComponent.prototype, "set_notes", null);
    NoteConceptComponent = __decorate([
        core_1.Component({
            selector: 'nb-app-note-concept',
            templateUrl: "app/notes/note-concept.component.html",
            styleUrls: ["app/notes/note-concept.component.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], NoteConceptComponent);
    return NoteConceptComponent;
}());
exports.NoteConceptComponent = NoteConceptComponent;
var ConceptNote = (function () {
    function ConceptNote(id, content) {
        this.id = id;
        this.content = content;
    }
    return ConceptNote;
}());
