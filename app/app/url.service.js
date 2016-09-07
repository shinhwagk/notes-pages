"use strict";
var RestUrls = (function () {
    function RestUrls() {
        this.labelsUrl = "/api/labels";
    }
    RestUrls.prototype.noteUrl = function (id) {
        return "/api/note/" + id;
    };
    RestUrls.prototype.labelUrl = function (label) {
        return "/api/label/" + label;
    };
    return RestUrls;
}());
exports.RestUrls = RestUrls;
var FileUrls = (function () {
    function FileUrls() {
        this.labelsUrl = "/api/labels.json";
    }
    FileUrls.prototype.noteUrl = function (id) {
        return "/api/note/" + id + ".json";
    };
    FileUrls.prototype.labelUrl = function (label) {
        return "/api/labels/" + label + ".json";
    };
    return FileUrls;
}());
exports.FileUrls = FileUrls;
exports.UrlServices = new RestUrls();
// export const UrlServices: Urls = new FileUrls() 
