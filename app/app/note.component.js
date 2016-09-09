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
    function NoteComponent(_apiServices) {
        this._apiServices = _apiServices;
        this._note_ids = [];
        this._note_commands = [];
        this._note_concepts = [];
        this._note_files = [];
        this._note_operations = [];
        this._note_commands_str = "{}";
        this._note_concepts_str = "{}";
        this._note_files_str = "{}";
        this._note_operations_str = "{}";
    }
    NoteComponent.prototype.ngOnInit = function () {
    };
    NoteComponent.prototype.clear_note_str_and_note_container = function () {
        this._note_commands = [];
        this._note_concepts = [];
        this._note_files = [];
        this._note_operations = [];
        this._note_commands_str = "{}";
        this._note_concepts_str = "{}";
        this._note_files_str = "{}";
        this._note_operations_str = "{}";
    };
    Object.defineProperty(NoteComponent.prototype, "_notes_str", {
        set: function (nids) {
            var _this = this;
            this._note_ids = JSON.parse(nids);
            this.clear_note_str_and_note_container();
            this._note_ids.forEach(function (id) {
                return _this._apiServices.getNote(id).toPromise().then(function (n) { return _this.note_dispatcher(n); });
            });
        },
        enumerable: true,
        configurable: true
    });
    NoteComponent.prototype.note_dispatcher = function (note) {
        switch (note.category) {
            case "concept":
                this._note_concepts.push(note);
                this._note_concepts_str = JSON.stringify(this._note_concepts);
                break;
            case "command":
                this._note_commands.push(note);
                this._note_commands_str = JSON.stringify(this._note_commands);
                break;
            case "file":
                this._note_files.push(note);
                this._note_files_str = JSON.stringify(this._note_files);
                break;
            case "operation":
                this._note_operations.push(note);
                this._note_operations_str = JSON.stringify(this._note_operations);
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
            providers: [api_services_1.ApiServices]
        }), 
        __metadata('design:paramtypes', [api_services_1.ApiServices])
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
