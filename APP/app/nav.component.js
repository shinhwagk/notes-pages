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
                this.shuffle_selected_labels();
            }
        }
        else {
            this._selected_labels.push(l);
            this.shuffle_selected_labels();
        }
    };
    NavComponent.prototype.shuffle_selected_labels = function () {
        var _this = this;
        var _labels = new Set();
        var _note_ids = new Set();
        var _label_edge = [];
        var _notes = [];
        var _selected_labels_count = this._selected_labels.length;
        this._selected_labels.forEach(function (sl) {
            _labels.add(sl);
            _this._apiServices.getLabel(sl).toPromise().then(function (p) {
                _selected_labels_count -= 1;
                p.edge.forEach(function (ls) {
                    _label_edge.push(ls);
                    _label_edge.filter(function (le) { return _label_edge.filter(function (le2) { return le2 == le; }).length >= _this._selected_labels.length; })
                        .forEach(function (le) { return _labels.add(le); });
                });
                p.notes.forEach(function (ls) {
                    _notes.push(ls);
                    _notes.filter(function (le) { return _notes.filter(function (le2) { return le2 == le; }).length >= _this._selected_labels.length; })
                        .forEach(function (le) { return _note_ids.add(le); });
                });
                if (_selected_labels_count == 0) {
                    _this._note_ids = Array.from(_note_ids);
                    _this._labels = Array.from(_labels);
                }
            });
        });
    };
    NavComponent.prototype.abc = function (a) {
        if (a == 0) {
        }
        else {
            this._selected_labels[1];
            this.abc(a - 1);
        }
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
