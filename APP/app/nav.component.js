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
var api_services_1 = require("./api.services");
var core_1 = require("@angular/core");
var NavComponent = (function () {
    function NavComponent(_apiServices) {
        this._apiServices = _apiServices;
        this._all_label = [];
        this._labels = [];
        this._selected_labels = [];
        this._note_ids = [];
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._apiServices.getAllLabels().toPromise().then(function (p) {
            _this._all_label = p;
            _this._labels = _this._all_label;
        });
    };
    NavComponent.prototype.check_label_selected = function (l) {
        return this._selected_labels.indexOf(l) != -1 ? true : false;
    };
    NavComponent.prototype.select_label = function (l) {
        if (this.check_label_selected(l)) {
            this._selected_labels = this._selected_labels.filter(function (p) { return p != l; });
            if (this._selected_labels.length == 0) {
                this._labels = this._all_label;
            }
            else {
                this.shuffle_selected();
            }
        }
        else {
            this._selected_labels.push(l);
            this.shuffle_selected();
        }
    };
    NavComponent.prototype.shuffle_selected = function () {
        var _label_edge = [];
        var _note_id = [];
        var _selected_labels_count = this._selected_labels.length;
        this.shuffle_selected_action(_selected_labels_count - 1, _label_edge, _note_id);
    };
    NavComponent.prototype.shuffle_selected_action = function (_selected_labels_count, _label_edge, _note_id) {
        var _this = this;
        var sl = this._selected_labels[_selected_labels_count];
        if (_selected_labels_count == -1) {
            var _labels_1 = new Set();
            var _note_ids_1 = new Set();
            this._selected_labels.forEach(function (elem) { return _labels_1.add(elem); });
            _label_edge.filter(function (le) { return _label_edge.filter(function (le2) { return le2 == le; }).length >= _this._selected_labels.length; })
                .forEach(function (elem) { return _labels_1.add(elem); });
            _note_id.filter(function (le) { return _note_id.filter(function (le2) { return le2 == le; }).length >= _this._selected_labels.length; })
                .forEach(function (elem) { return _note_ids_1.add(elem); });
            this._note_ids = Array.from(_note_ids_1);
            this._labels = Array.from(_labels_1);
        }
        else {
            this._apiServices.getLabel(sl).toPromise().then(function (p) {
                p.edge.forEach(function (ls) { return _label_edge.push(ls); });
                p.notes.forEach(function (ls) { return _note_id.push(ls); });
                _this.shuffle_selected_action(_selected_labels_count - 1, _label_edge, _note_id);
            });
        }
    };
    NavComponent.prototype.clear_selected_labels = function () {
        this._selected_labels = [];
        this._labels = this._all_label;
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'nb-app-nav',
            templateUrl: "app/nav.component.html",
            styleUrls: ["app/nav.component.css"],
            providers: [api_services_1.ApiServices]
        }), 
        __metadata('design:paramtypes', [api_services_1.ApiServices])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
