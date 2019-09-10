"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var oaty_1 = require("oaty");
var ID_1 = require("./ID");
var Tagged_1 = require("./Tagged");
var Tagable = (function () {
    function Tagable(resources, tags, tagged) {
        if (resources === void 0) { resources = []; }
        if (tags === void 0) { tags = []; }
        if (tagged === void 0) { tagged = []; }
        this._resources = new oaty_1.OatyArray(resources);
        this._tags = new oaty_1.OatyArray(tags);
        this._tagged = new oaty_1.OatyArray(tagged);
    }
    Object.defineProperty(Tagable.prototype, "resources", {
        get: function () {
            return this._resources.data;
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
        (_a = this._tags).push.apply(_a, data.tags);
        (_b = this._tagged).push.apply(_b, data.tagged);
        (_c = this._resources).push.apply(_c, data.resources);
    };
    Tagable.prototype.export = function () {
        return JSON.stringify({
            tags: this._tags.data,
            tagged: this._tagged.data,
            resources: this._resources.data
        });
    };
    Tagable.prototype.load = function (path) {
        var data = JSON.parse(fs_1.readFileSync(path, 'utf-8'));
        this.import(data);
    };
    Tagable.prototype.save = function (path) {
        fs_1.writeFileSync(path, this.export());
    };
    Tagable.prototype.addResource = function (resource) {
        if (this._resources.get('id', resource.id)) {
            resource.id = ID_1.generateResourceID();
        }
        this._resources.push(resource);
    };
    Tagable.prototype.getResourceBy = function (property, value) {
        return this._resources.get(property, value);
    };
    Tagable.prototype.addTag = function (tag) {
        if (this._tags.get('id', tag.id)) {
            tag.id = ID_1.generateTagID();
        }
        this._tags.push(tag);
    };
    Tagable.prototype.getTagBy = function (property, value) {
        return this._tags.get(property, value);
    };
    Tagable.prototype.tagResource = function (resource, tag) {
        this._tagged.push(new Tagged_1.Tagged(resource.id, tag.id));
    };
    return Tagable;
}());
exports.Tagable = Tagable;
//# sourceMappingURL=Tagable.js.map