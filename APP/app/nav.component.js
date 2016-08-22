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
var core_1 = require('@angular/core');
var api_services_1 = require("./api.services");
var NavComponent = (function () {
    function NavComponent(_apiServices) {
        this._apiServices = _apiServices;
        this._labels = [];
        this._selected_labels = [];
        this._select_edge_labels = [];
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._apiServices.getAllLabels().toPromise().then(function (p) { return _this._labels = p; });
    };
    NavComponent.prototype.check_label_selected = function (l) {
        return this._selected_labels.filter(function (p) { return p == l; }).length > 0 ? true : false;
    };
    NavComponent.prototype.select_label = function (l) {
        var _this = this;
        if (this.check_label_selected(l)) {
            // this.ngOnInit()
            this._selected_labels = this._selected_labels.filter(function (p) { return p != l; });
            this._apiServices.getLabel(l).toPromise().then(function (p) {
                p.edge.forEach(function (l) {
                });
            });
        }
        else {
            this._selected_labels.push(l);
            this._labels = [];
            this._selected_labels.forEach(function (sl) { return _this._labels.push(sl); });
            this._apiServices.getLabel(l).toPromise().then(function (p) {
                p.edge.forEach(function (e) {
                    _this._labels.push(e);
                });
            });
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
