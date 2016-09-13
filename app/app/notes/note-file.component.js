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
var NoteFileComponent = (function () {
    function NoteFileComponent() {
        this.header = "File";
        this.notes = [];
    }
    Object.defineProperty(NoteFileComponent.prototype, "set_notes", {
        set: function (notes) {
            console.info(notes, "files note before.");
            this.notes = notes.map(function (n) { return new FileNote(n.id, JSON.parse(n.content), n.relations); });
            console.info(this.notes, "files note after.");
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], NoteFileComponent.prototype, "set_notes", null);
    NoteFileComponent = __decorate([
        core_1.Component({
            selector: 'nb-app-note-file',
            templateUrl: "app/notes/note-file.component.html",
            styleUrls: ["app/notes/note-file.component.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], NoteFileComponent);
    return NoteFileComponent;
}());
exports.NoteFileComponent = NoteFileComponent;
var FileNote = (function () {
    function FileNote(id, content, relations) {
        this.id = id;
        this.content = content;
        this.relations = relations;
    }
    return FileNote;
}());
