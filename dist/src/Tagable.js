"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var oaty_1 = require("oaty");
var Tagable = (function () {
    function Tagable(data) {
        if (data === void 0) { data = {}; }
        this._tags = data.tags || {};
        this._resources = data.resources || {};
        this._tagged = new oaty_1.OatyArray(data.tagged);
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
        var _a;
        Object.assign(this._tags, data.tags);
        Object.assign(this._resources, data.resources);
        (_a = this._tagged).push.apply(_a, data.tagged || []);
    };
    Tagable.prototype.export = function () {
        return JSON.stringify({
            resources: this.resources,
            tagged: this.tagged,
            tags: this.tags
        });
    };
    Tagable.prototype.addResource = function (resourceID, resource) {
        if (this._resources[resourceID]) {
            throw Error("Resource ID '" + resourceID + "' is already in use");
        }
        this._resources[resourceID] = resource;
    };
    Tagable.prototype.addTag = function (tagID, tag) {
        if (this._tags[tagID]) {
            throw Error("Tag ID '" + tagID + "' is already in use");
        }
        this._tags[tagID] = tag;
    };
    Tagable.prototype.tagResource = function (tagged) {
        if (this._resources[tagged.resourceID] === undefined) {
            throw ReferenceError("Unknown resource '" + tagged.resourceID + "'");
        }
        if (this._tags[tagged.tagID] === undefined) {
            throw ReferenceError("Unknown tag '" + tagged.tagID + "'");
        }
        this._tagged.push(tagged);
    };
    Tagable.prototype.getTags = function (resourceID) {
        var _this = this;
        if (this._resources[resourceID] === undefined) {
            throw ReferenceError("Unknown resource '" + resourceID + "'");
        }
        var tagged = this._tagged.get('resourceID', resourceID);
        if (tagged === undefined) {
            return {};
        }
        var result = {};
        tagged.forEach(function (tag) { result[tag.tagID] = _this._tags[tag.tagID]; });
        return result;
    };
    Tagable.prototype.getResources = function (tagID) {
        var _this = this;
        if (this._tags[tagID] === undefined) {
            throw ReferenceError("Unknown tag '" + tagID + "'");
        }
        var tagged = this._tagged.get('tagID', tagID);
        if (tagged === undefined) {
            return {};
        }
        var result = {};
        tagged.forEach(function (tag) { result[tag.resourceID] = _this._resources[tag.resourceID]; });
        return result;
    };
    return Tagable;
}());
exports.Tagable = Tagable;
//# sourceMappingURL=Tagable.js.map