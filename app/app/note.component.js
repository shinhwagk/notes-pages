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
var NoteComponent = (function () {
    function NoteComponent(_api) {
        this._api = _api;
        this._note_ids = [];
        this.concept_id = [];
        this.command_id = [];
        this.file_id = [];
        this.operation_id = [];
        this.labels = [];
    }
    NoteComponent.prototype.noteIdCollect = function (labels, num, noteIdArr) {
        var _this = this;
        var sl = labels[num];
        if (num == -1) {
            noteIdArr.forEach(function (x) { return _this.noteDispatcher(x); });
            this.command_id = this.filterCommonNoteId(this.command_id);
            this.file_id = this.filterCommonNoteId(this.file_id);
            this.concept_id = this.filterCommonNoteId(this.concept_id);
            this.operation_id = this.filterCommonNoteId(this.operation_id);
            console.info(this.concept_id, 55);
        }
        else {
            this._api.getLabel(sl).toPromise().then(function (n) {
                noteIdArr.push(n.notes);
                _this.noteIdCollect(labels, num - 1, noteIdArr);
            });
        }
    };
    NoteComponent.prototype.filterCommonNoteId = function (id_arr) {
        var _this = this;
        var s = new Set();
        id_arr.filter(function (le) { return id_arr.filter(function (le2) { return le2 == le; }).length >= _this.labels.length; }).forEach(function (v) { return s.add(v); });
        return Array.from(s);
    };
    Object.defineProperty(NoteComponent.prototype, "_notes_str", {
        set: function (labels) {
            this.labels = labels;
            this.clearNote();
            this.noteIdCollect(labels, labels.length - 1, []);
        },
        enumerable: true,
        configurable: true
    });
    NoteComponent.prototype.clearNote = function () {
        this.concept_id = [];
        this.command_id = [];
        this.file_id = [];
        this.operation_id = [];
    };
    NoteComponent.prototype.noteDispatcher = function (note) {
        var _this = this;
        var keys = [];
        for (var k in note) {
            keys.push(k);
        }
        keys.forEach(function (k) {
            switch (k) {
                case "concept":
                    note[k].forEach(function (id) { return _this.concept_id.push(id); });
                    break;
                case "command":
                    note[k].forEach(function (id) { return _this.command_id.push(id); });
                    break;
                case "file":
                    note[k].forEach(function (id) { return _this.file_id.push(id); });
                    break;
                case "operation":
                    note[k].forEach(function (id) { return _this.operation_id.push(id); });
                    break;
                default:
                    confirm("Sorry, that color is not in the system yet!");
            }
        });
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
            providers: [api_services_1.ApiServices]
        }), 
        __metadata('design:paramtypes', [api_services_1.ApiServices])
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
