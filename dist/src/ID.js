"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var randomstring_1 = __importDefault(require("randomstring"));
function generateID() {
    return randomstring_1.default.generate(7);
}
function generateTagID() {
    return "t" + generateID();
}
exports.generateTagID = generateTagID;
function generateResourceID() {
    return "r" + generateID();
}
exports.generateResourceID = generateResourceID;
//# sourceMappingURL=ID.js.map