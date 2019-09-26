"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Resource_1 = require("../src/Resource");
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
    describe('.resources', function () {
        context('with no data', function () {
            it('returns an empty array', function () {
                fixture.givenTagable();
                fixture.thenResourcesEquals([]);
            });
        });
        context('with initialised data', function () {
            it('returns initialised data', function () {
                fixture.givenTagable(data);
                fixture.thenResourcesEquals(resources);
            });
        });
        context('with imported data', function () {
            it('returns imported data', function () {
                var resource = new Resource_1.Resource("hi");
                fixture.givenTagable();
                fixture.whenImportIsCalled(data);
                fixture.thenResourcesEquals(data.resources);
            });
        });
        context('with added data', function () {
            it('returns added data', function () {
                var resource = new Resource_1.Resource("hi");
                fixture.givenTagable();
                fixture.whenAddResourceIsCalled(resource);
                fixture.thenResourcesEquals([resource]);
            });
        });
    });
});
var Fixture = (function () {
    function Fixture() {
    }
    Fixture.prototype.givenTagable = function (data) {
        this._tagable = new Tagable_1.Tagable(data);
    };
    Fixture.prototype.whenAddResourceIsCalled = function (resource) {
        this._tagable.addResource(resource);
    };
    Fixture.prototype.whenImportIsCalled = function (data) {
        this._tagable.import(data);
    };
    Fixture.prototype.thenResourcesEquals = function (resources) {
        chai_1.expect(this._tagable.resources).to.deep.equal(resources);
    };
    Fixture.prototype.thenTagableExists = function () {
        chai_1.expect(this._tagable).to.exist;
    };
    return Fixture;
}());
//# sourceMappingURL=Tagable.spec.js.map