"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var randomstring_1 = __importDefault(require("randomstring"));
function generateID() {
    return randomstring_1.default.generate(7);
}
function generateTagID(tagIDs) {
    var id;
    do {
        id = "t" + generateID();
    } while (tagIDs && tagIDs.includes(id));
    return id;
}
exports.generateTagID = generateTagID;
function generateResourceID(resourceIDs) {
    var id;
    do {
        id = "r" + generateID();
    } while (resourceIDs && resourceIDs.includes(id));
    return id;
}
exports.generateResourceID = generateResourceID;
//# sourceMappingURL=ID.js.map