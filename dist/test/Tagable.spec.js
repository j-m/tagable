"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Resource_1 = require("../src/Resource");
var Tag_1 = require("../src/Tag");
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
                var resource = new Resource_1.Resource("penguin");
                fixture.givenTagable({ resources: { "penguin": resource } });
                fixture.thenResourcesEquals([resource]);
            });
        });
        context('with imported data', function () {
            it('returns imported data', function () {
                var resource = new Resource_1.Resource("penguin");
                fixture.givenTagable();
                fixture.whenImportIsCalled({ resources: { "penguin": resource } });
                fixture.thenResourcesEquals([resource]);
            });
        });
        context('with added data', function () {
            it('returns added data', function () {
                var resource = new Resource_1.Resource("penguin");
                fixture.givenTagable();
                fixture.whenAddResourceIsCalled("penguin", resource);
                fixture.thenResourcesEquals([resource]);
            });
        });
    });
    describe('.tags', function () {
        context('with no data', function () {
            it('returns an empty array', function () {
                fixture.givenTagable();
                fixture.thenTagsEquals([]);
            });
        });
        context('with initialised data', function () {
            it('returns initialised data', function () {
                var tag = new Tag_1.Tag("cute");
                fixture.givenTagable({ tags: { "cute": tag } });
                fixture.thenTagsEquals([tag]);
            });
        });
        context('with imported data', function () {
            it('returns imported data', function () {
                var tag = new Tag_1.Tag("cute");
                fixture.givenTagable();
                fixture.whenImportIsCalled({ tags: { "cute": tag } });
                fixture.thenTagsEquals([tag]);
            });
        });
        context('with added data', function () {
            it('returns added data', function () {
                var tag = new Tag_1.Tag("cute");
                fixture.givenTagable();
                fixture.whenAddTagIsCalled("cute", tag);
                fixture.thenTagsEquals([tag]);
            });
        });
    });
    describe('.tagged', function () {
        context('with no data', function () {
            it('returns an empty array', function () {
                fixture.givenTagable();
                fixture.thenTaggedEquals([]);
            });
        });
        context('with initialised data', function () {
            it('returns initialised data', function () {
                var tagged = { resourceID: "r123", tagID: "t123" };
                fixture.givenTagable({ tagged: [tagged] });
                fixture.thenTaggedEquals([tagged]);
            });
        });
        context('with imported data', function () {
            it('returns imported data', function () {
                var tagged = { resourceID: "r123", tagID: "t123" };
                fixture.givenTagable();
                fixture.whenImportIsCalled({ tagged: [tagged] });
                fixture.thenTaggedEquals([tagged]);
            });
        });
        context('with new tagged resource', function () {
            it('returns generated tagged', function () {
                var resource = new Resource_1.Resource("penguin");
                var tag = new Tag_1.Tag("cute");
                fixture.givenTagable();
                fixture.whenAddResourceIsCalled("penguin", resource);
                fixture.whenAddTagIsCalled("cute", tag);
                fixture.whenTagResourceIsCalled("penguin", "cute");
                fixture.thenTaggedEquals([{ resourceID: "penguin", tagID: "cute" }]);
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
    Fixture.prototype.whenAddResourceIsCalled = function (id, resource) {
        this._tagable.addResource(id, resource);
    };
    Fixture.prototype.whenAddTagIsCalled = function (id, tag) {
        this._tagable.addTag(id, tag);
    };
    Fixture.prototype.whenImportIsCalled = function (data) {
        this._tagable.import(data);
    };
    Fixture.prototype.whenTagResourceIsCalled = function (resourceID, tagID) {
        this._tagable.tagResource(resourceID, tagID);
    };
    Fixture.prototype.thenResourcesEquals = function (resources) {
        chai_1.expect(this._tagable.resources).to.deep.equal(resources);
    };
    Fixture.prototype.thenTaggedEquals = function (tagged) {
        chai_1.expect(this._tagable.tagged).to.deep.equal(tagged);
    };
    Fixture.prototype.thenTagsEquals = function (tags) {
        chai_1.expect(this._tagable.tags).to.deep.equal(tags);
    };
    Fixture.prototype.thenTagableExists = function () {
        chai_1.expect(this._tagable).to.exist;
    };
    return Fixture;
}());
//# sourceMappingURL=Tagable.spec.js.map