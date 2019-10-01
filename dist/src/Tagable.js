"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var oaty_1 = require("oaty");
var Tagable = (function () {
    function Tagable(data) {
        if (data === void 0) { data = {}; }
        this._resources = data.resources || {};
        this._tags = data.tags || {};
        this._tagged = new oaty_1.OatyArray(data.tagged || []);
    }
    Object.defineProperty(Tagable.prototype, "resources", {
        get: function () {
            return this._resources;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tagable.prototype, "tagged", {
        get: function () {
            return this._tagged.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tagable.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        enumerable: true,
        configurable: true
    });
    Tagable.prototype.import = function (data) {
        Object.assign(this._tags, data.tags);
        Object.assign(this._tagged, data.tagged);
        Object.assign(this._resources, data.resources);
    };
    Tagable.prototype.export = function () {
        return JSON.stringify({
            tags: this.tags,
            tagged: this.tagged,
            resources: this.resources
        });
    };
    Tagable.prototype.addResource = function (resourceID, resource) {
        if (this._resources[resourceID]) {
            throw Error("Resource ID '" + resourceID + "' is already in use");
        }
        this._resources[resourceID] = resource;
    };
    Tagable.prototype.addTag = function (tagID, tag) {
        if (this._resources[tagID]) {
            throw Error("Tag ID '" + tagID + "' is already in use");
        }
        this._tags[tagID] = tag;
    };
    Tagable.prototype.tagResource = function (resourceID, tagID) {
        this._tagged.push([resourceID, tagID]);
    };
    Tagable.prototype.getTags = function (resourceID) {
        var _this = this;
        var tagged = this._tagged.get('resourceID', resourceID);
        return tagged.map(function (tag) { return (_this._tags[tag.tagID]); });
    };
    Tagable.prototype.getResources = function (tagID) {
        var _this = this;
        var tagged = this._tagged.get('tagID', tagID);
        return tagged.map(function (tag) { return (_this._resources[tag.resourceID]); });
    };
    return Tagable;
}());
exports.Tagable = Tagable;
//# sourceMappingURL=Tagable.js.map