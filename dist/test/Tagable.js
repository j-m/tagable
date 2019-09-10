"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Tagable_1 = require("../src/Tagable");
var fixture;
describe('Tagable', function () {
    beforeEach(function () {
        fixture = new Fixture();
    });
    describe('constructor', function () {
        context('()', function () {
            it('initialises', function () {
                fixture.givenTagable();
                fixture.thenTagableExists();
            });
        });
    });
});
var Fixture = (function () {
    function Fixture() {
    }
    Fixture.prototype.givenTagable = function () {
        this._tagable = new Tagable_1.Tagable();
    };
    Fixture.prototype.thenTagableExists = function () {
        chai_1.expect(this._tagable).to.exist;
    };
    return Fixture;
}());
//# sourceMappingURL=Tagable.js.map