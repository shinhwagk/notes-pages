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
        this._selected_labels = [];
        this._all_label = [];
        this._labels = [];
        this.concepts = [];
        this.commands = [];
        this.files = [];
        this.operations = [];
    }
    NoteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._api.getAllLabels().toPromise().then(function (p) {
            _this._all_label = p;
            _this._labels = _this._all_label;
        });
    };
    NoteComponent.prototype.noteIdCollect = function (labels, num, noteIdArr, labelArr) {
        var _this = this;
        var sl = labels[num];
        if (num == -1) {
            this.clearNote();
            var ids = this.filterCommonNoteId(noteIdArr, this._selected_labels.length);
            this._labels = this.filterCommonNoteId(labelArr, this._selected_labels.length);
            console.info(ids, "noteIdCollect");
            console.info(labelArr, "noteIdCollect");
            ids.forEach(function (id) { return _this._api.getNote(id).toPromise().then(function (note) { return _this.noteDispatcher(note); }); });
        }
        else {
            this._api.getLabel(sl).toPromise().then(function (label) {
                label.notes.forEach(function (id) { return noteIdArr.push(id); });
                label.edge.forEach(function (label) { return labelArr.push(label); });
                _this.noteIdCollect(labels, num - 1, noteIdArr, labelArr);
            });
        }
    };
    NoteComponent.prototype.filterCommonNoteId = function (id_arr, cnt) {
        var s = new Set();
        id_arr.filter(function (le) { return id_arr.filter(function (le2) { return le2 == le; }).length >= cnt; }).forEach(function (v) { return s.add(v); });
        return Array.from(s);
    };
    NoteComponent.prototype.clearNote = function () {
        this.concepts = [];
        this.commands = [];
        this.files = [];
        this.operations = [];
    };
    NoteComponent.prototype.noteDispatcher = function (note) {
        switch (note.category) {
            case "concept":
                this.concepts.push(note);
                this.concepts = this.concepts.slice(0);
                break;
            case "command":
                this.commands.push(note);
                this.commands = this.commands.slice(0);
                break;
            case "file":
                this.files.push(note);
                this.files = this.files.slice(0);
                break;
            case "operation":
                this.operations.push(note);
                this.operations = this.operations.slice(0);
                break;
            default:
                confirm("Sorry, that color is not in the system yet!");
        }
    };
    NoteComponent.prototype.check_label_selected = function (l) {
        return this._selected_labels.indexOf(l) === -1 ? false : true;
    };
    NoteComponent.prototype.select_label = function (l) {
        if (this.check_label_selected(l)) {
            if (this._selected_labels.length - 1 === 0) {
                this.clear_selected_labels();
            }
            else {
                this._selected_labels = this._selected_labels.filter(function (p) { return p != l; });
                this.noteIdCollect(this._selected_labels, this._selected_labels.length - 1, [], this._selected_labels.slice(0));
            }
        }
        else {
            this._selected_labels.push(l);
            this.noteIdCollect(this._selected_labels, this._selected_labels.length - 1, [], this._selected_labels.slice(0));
        }
    };
    NoteComponent.prototype.clear_selected_labels = function () {
        this._selected_labels = [];
        this._labels = this._all_label;
    };
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
