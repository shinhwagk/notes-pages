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
        this._notes = new Map();
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
            this._selected_labels = this._selected_labels.filter(function (p) { return p != l; });
            if (this._selected_labels.length == 0) {
                this._labels = this._all_label;
            }
            else {
            }
        }
        else {
            this._selected_labels.push(l);
        }
        console.info(this._selected_labels);
        console.info(JSON.stringify(this._selected_labels));
    };
    NavComponent.prototype.shuffle_selected = function () {
        var _label_edge = [];
        var _notes = new Map();
        var _selected_labels_count = this._selected_labels.length;
        this.shuffle_selected_action(_selected_labels_count - 1, _label_edge, _notes);
    };
    NavComponent.prototype.shuffle_selected_action = function (_selected_labels_count, _label_edge, _notes) {
        var _this = this;
        var sl = this._selected_labels[_selected_labels_count];
        // if (_selected_labels_count == -1) {
        //     let _labels = new Set<string>()
        //     let _note_ids = new Set<number>()
        //     this._selected_labels.forEach(elem => _labels.add(elem))
        //     _label_edge.filter(le => _label_edge.filter(le2 => le2 == le).length >= this._selected_labels.length)
        //         .forEach(elem => _labels.add(elem))
        //
        //     // _notes.filter(le => _notes.filter(le2 => le2 == le).length >= this._selected_labels.length)
        //     //     .forEach(elem => _note_ids.add(elem))
        //     // this._notes = Array.from<number>(_note_ids)
        //     this._labels = Array.from<string>(_labels)
        // } else {
        this._api.getLabel(sl).toPromise().then(function (p) {
            var keys = _this.getKeys(p.notes);
            keys.forEach(function (k) { return console.info(p.notes[k]); });
            p.edge.forEach(function (ls) { return _label_edge.push(ls); });
            // p.notes.set(p.notes)
            // this.shuffle_selected_action(_selected_labels_count - 1, _label_edge, _notes)
        });
        // }
    };
    NavComponent.prototype.clear_selected_labels = function () {
        this._selected_labels = [];
        this._labels = this._all_label;
    };
    NavComponent.prototype.getKeys = function (o) {
        var keys = [];
        for (var k in o) {
            keys.push(k);
        }
        return keys;
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
