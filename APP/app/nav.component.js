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
        this._labels = new Set();
        this._selected_labels = [];
        this._notes = new Set();
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._labels = new Set();
        this._notes = new Set();
        this._apiServices.getAllLabels().toPromise().then(function (p) { return _this._labels = p; });
    };
    NavComponent.prototype.check_label_selected = function (l) {
        return this._selected_labels.filter(function (p) { return p == l; }).length > 0 ? true : false;
    };
    NavComponent.prototype.select_label = function (l) {
        if (this.check_label_selected(l)) {
            this._selected_labels = this._selected_labels.filter(function (p) { return p != l; });
            if (this._selected_labels.length == 0) {
                this.ngOnInit();
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
        this._labels = new Set();
        this._notes = new Set();
        var _label_edge = [];
        var _notes = [];
        this._selected_labels.forEach(function (sl) {
            _this._labels.add(sl);
            _this._apiServices.getLabel(sl).toPromise().then(function (p) {
                p.edge.forEach(function (ls) {
                    _label_edge.push(ls);
                    _label_edge.filter(function (le) { return _label_edge.filter(function (le2) { return le2 == le; }).length >= _this._selected_labels.length; })
                        .forEach(function (le) { return _this._labels.add(le); });
                });
                p.notes.forEach(function (ls) {
                    _notes.push(ls);
                    _notes.filter(function (le) { return _notes.filter(function (le2) { return le2 == le; }).length >= _this._selected_labels.length; })
                        .forEach(function (le) { return _this._notes.add(le); });
                });
            });
        });
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
