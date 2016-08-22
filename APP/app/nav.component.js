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
var api_service_1 = require("./api.service");
var NavComponent = (function () {
    function NavComponent(_apiServices) {
        this._apiServices = _apiServices;
        this._labels = ["aa", ["xxx", "s"]];
        this._selected_labels = [];
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._apiServices.getAllLabels().toPromise().then(function (p) { return _this._labels = p; });
    };
    NavComponent.prototype.check_label_selected = function (l) {
        return this._selected_labels.filter(function (p) { return p == l; }).length > 0 ? true : false;
    };
    NavComponent.prototype.select_label = function (l) {
        if (this.check_label_selected(l)) {
            this._selected_labels = this._selected_labels.filter(function (p) { return p != l; });
        }
        else {
            this._selected_labels.push(l);
        }
        this._apiServices.getLabels(this._selected_labels).toPromise().then();
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'nb-app-nav',
            templateUrl: "app/nav.component.html",
            styleUrls: ["app/nav.component.css"],
            providers: [api_service_1.ApiServices]
        }), 
        __metadata('design:paramtypes', [api_service_1.ApiServices])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
