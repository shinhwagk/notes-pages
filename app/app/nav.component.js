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
    function NavComponent(_api) {
        this._api = _api;
        this._all_label = [];
        this._labels = [];
        this._selected_labels = [];
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._api.getAllLabels().toPromise().then(function (p) {
            _this._all_label = p;
            _this._labels = _this._all_label;
        });
    };
    NavComponent.prototype.check_label_selected = function (l) {
        return this._selected_labels.indexOf(l) != -1 ? true : false;
    };
    NavComponent.prototype.select_label = function (l) {
        if (this.check_label_selected(l)) {
            if (this._selected_labels.length - 1 === 0) {
                this.clear_selected_labels();
            }
            else {
                this._selected_labels = this._selected_labels.filter(function (p) { return p != l; });
            }
        }
        else {
            this._selected_labels.push(l);
            this._selected_labels = this._selected_labels.slice(0);
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
