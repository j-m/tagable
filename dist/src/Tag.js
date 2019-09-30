"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Relation;
(function (Relation) {
    Relation[Relation["Parent"] = 0] = "Parent";
    Relation[Relation["Similar"] = 1] = "Similar";
    Relation[Relation["Child"] = 2] = "Child";
    Relation[Relation["Inverse"] = 3] = "Inverse";
})(Relation || (Relation = {}));
var Tag = (function () {
    function Tag(id, data, relationships) {
        this.id = id;
        this.data = data;
        this.relationships = relationships;
    }
    return Tag;
}());
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map