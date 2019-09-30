"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var oaty_1 = require("oaty");
var Tagged_1 = require("./Tagged");
var Tagable = (function () {
    function Tagable(data) {
        if (data === void 0) { data = {}; }
        this._resources = new oaty_1.OatyArray(data.resources || []);
        this._tagged = new oaty_1.OatyArray(data.tagged || []);
        this._tags = new oaty_1.OatyArray(data.tags || []);
    }
    Object.defineProperty(Tagable.prototype, "resources", {
        get: function () {
            return this._resources.data;
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
            return this._tags.data;
        },
        enumerable: true,
        configurable: true
    });
    Tagable.prototype.import = function (data) {
        var _a, _b, _c;
        if (data.tags) {
            (_a = this._tags).push.apply(_a, data.tags);
        }
        if (data.tagged) {
            (_b = this._tagged).push.apply(_b, data.tagged);
        }
        if (data.resources) {
            (_c = this._resources).push.apply(_c, data.resources);
        }
    };
    Tagable.prototype.export = function () {
        return JSON.stringify({
            tags: this.tags,
            tagged: this.tagged,
            resources: this.resources
        });
    };
    Tagable.prototype.addResource = function (resource) {
        this._resources.push(resource);
    };
    Tagable.prototype.getResourceBy = function (property, value) {
        return this._resources.get(property, value);
    };
    Tagable.prototype.addTag = function (tag) {
        this._tags.push(tag);
    };
    Tagable.prototype.getTagBy = function (property, value) {
        return this._tags.get(property, value);
    };
    Tagable.prototype.tagResource = function (resource, tag) {
        this._tagged.push(new Tagged_1.Tagged(resource.id, tag.id));
    };
    Tagable.prototype.getTagsByResourceID = function (id) {
        return this._tagged.get('resourceID', id);
    };
    Tagable.prototype.getResourcesByTagID = function (id) {
        return this._tagged.get('tagID', id);
    };
    return Tagable;
}());
exports.Tagable = Tagable;
//# sourceMappingURL=Tagable.js.map