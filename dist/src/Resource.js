"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ID_1 = require("./ID");
var Resource = (function () {
    function Resource(source) {
        this.source = source;
        this.id = ID_1.generateResourceID();
    }
    return Resource;
}());
exports.Resource = Resource;
//# sourceMappingURL=Resource.js.map