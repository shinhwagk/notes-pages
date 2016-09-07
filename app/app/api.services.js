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
 * Created by zhangxu on 2016/8/17.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var url_service_1 = require("./url.service");
var ApiServices = (function () {
    function ApiServices(_http) {
        this._http = _http;
        this._urlServices = url_service_1.UrlServices;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    ApiServices.prototype.getAllLabels = function () {
        return this._http.get(this._urlServices.labelsUrl).map(function (res) { return res.json(); });
    };
    ApiServices.prototype.getLabel = function (l) {
        return this._http.get(this._urlServices.labelUrl(l)).map(function (res) { return res.json(); });
    };
    ApiServices.prototype.getNote = function (id) {
        return this._http.get(this._urlServices.noteUrl(id)).map(function (res) { return res.json(); });
    };
    ApiServices.prototype.getAppType = function () {
    };
    ApiServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiServices);
    return ApiServices;
}());
exports.ApiServices = ApiServices;
