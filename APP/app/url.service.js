"use strict";
var RestUrls = (function () {
    function RestUrls() {
        this.allLabelsUrl = "/api/labels";
    }
    RestUrls.prototype.labelUrl = function (label) {
        return "/api/labels/" + label;
    };
    return RestUrls;
}());
exports.RestUrls = RestUrls;
var FileUrls = (function () {
    function FileUrls() {
        this.allLabelsUrl = "/api/labels.json";
    }
    FileUrls.prototype.labelUrl = function (label) {
        return "/api/labels/" + label + ".json";
    };
    return FileUrls;
}());
exports.FileUrls = FileUrls;
exports.UrlServices = new RestUrls();
