"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ID_1 = require("./ID");
var Relation;
(function (Relation) {
    Relation[Relation["Parent"] = 0] = "Parent";
    Relation[Relation["Similar"] = 1] = "Similar";
    Relation[Relation["Child"] = 2] = "Child";
    Relation[Relation["Inverse"] = 3] = "Inverse";
})(Relation || (Relation = {}));
var Tag = (function () {
    function Tag(title, description, imageURL, relationships) {
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.relationships = relationships;
        this.id = ID_1.generateTagID();
    }
    return Tag;
}());
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map