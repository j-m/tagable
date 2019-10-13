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
    describe('new', function () {
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
                fixture.thenResourcesEquals({});
            });
        });
        context('with initialised data', function () {
            it('returns initialised data', function () {
                var resource = new Resource_1.Resource('penguin');
                fixture.givenTagable({ resources: { penguin: resource } });
                fixture.thenResourcesEquals({ penguin: resource });
            });
        });
        context('with imported data', function () {
            it('returns imported data', function () {
                var resource = new Resource_1.Resource('penguin');
                fixture.givenTagable();
                fixture.whenImportIsCalled({ resources: { penguin: resource } });
                fixture.thenResourcesEquals({ penguin: resource });
            });
        });
        context('with added data', function () {
            it('returns added data', function () {
                var resource = new Resource_1.Resource('penguin');
                fixture.givenTagable();
                fixture.whenAddResourceIsCalled('penguin', resource);
                fixture.thenResourcesEquals({ penguin: resource });
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
                var tagged = { resourceID: 'r123', tagID: 't123' };
                fixture.givenTagable({ tagged: [tagged] });
                fixture.thenTaggedEquals([tagged]);
            });
        });
        context('with imported data', function () {
            it('returns imported data', function () {
                var tagged = { resourceID: 'r123', tagID: 't123' };
                fixture.givenTagable();
                fixture.whenImportIsCalled({ tagged: [tagged] });
                fixture.thenTaggedEquals([tagged]);
            });
        });
        context('with new tagged resource', function () {
            it('returns generated tagged', function () {
                var resource = new Resource_1.Resource('penguin');
                var tag = new Tag_1.Tag('cute');
                fixture.givenTagable();
                fixture.whenAddResourceIsCalled('penguin', resource);
                fixture.whenAddTagIsCalled('cute', tag);
                fixture.whenTagResourceIsCalled('penguin', 'cute');
                fixture.thenTaggedEquals([{ resourceID: 'penguin', tagID: 'cute' }]);
            });
        });
    });
    describe('.tags', function () {
        context('with no data', function () {
            it('returns an empty array', function () {
                fixture.givenTagable();
                fixture.thenTagsEquals({});
            });
        });
        context('with initialised data', function () {
            it('returns initialised data', function () {
                var tag = new Tag_1.Tag('cute');
                fixture.givenTagable({ tags: { cute: tag } });
                fixture.thenTagsEquals({ cute: tag });
            });
        });
        context('with imported data', function () {
            it('returns imported data', function () {
                var tag = new Tag_1.Tag('cute');
                fixture.givenTagable();
                fixture.whenImportIsCalled({ tags: { cute: tag } });
                fixture.thenTagsEquals({ cute: tag });
            });
        });
        context('with added data', function () {
            it('returns added data', function () {
                var tag = new Tag_1.Tag('cute');
                fixture.givenTagable();
                fixture.whenAddTagIsCalled('cute', tag);
                fixture.thenTagsEquals({ cute: tag });
            });
        });
    });
    describe('.addResource', function () {
        context('(unused, resource)', function () {
            it('adds the resource', function () {
                var resource = new Resource_1.Resource();
                fixture.givenTagable();
                fixture.whenAddResourceIsCalled('penguin', resource);
                fixture.thenResourcesEquals({ penguin: resource });
            });
        });
        context('(used, resource)', function () {
            it('throws', function () {
                var resource = new Resource_1.Resource();
                fixture.givenTagable({ resources: { penguin: resource } });
                chai_1.expect(function () {
                    fixture.whenAddResourceIsCalled('penguin', resource);
                }).to.throw(Error, "Resource ID 'penguin' is already in use");
            });
        });
    });
    describe('.addTag', function () {
        context('(unused, tag)', function () {
            it('adds the tag', function () {
                var tag = new Tag_1.Tag();
                fixture.givenTagable();
                fixture.whenAddTagIsCalled('cute', tag);
                fixture.thenTagsEquals({ cute: tag });
            });
        });
        context('(used, tag)', function () {
            it('throws', function () {
                var tag = new Tag_1.Tag();
                fixture.givenTagable({ tags: { cute: tag } });
                chai_1.expect(function () {
                    fixture.whenAddTagIsCalled('cute', tag);
                }).to.throw(Error, "Tag ID 'cute' is already in use");
            });
        });
    });
    describe('.export', function () {
        context('({})', function () {
            it('nothing is exported', function () {
                fixture.givenTagable();
                fixture.thenExportEquals('{"resources":{},"tagged":[],"tags":{}}');
            });
        });
        context('({..., ..., ...})', function () {
            it('everything is exported', function () {
                var resource = new Resource_1.Resource();
                var tag = new Tag_1.Tag();
                var tagged = { resourceID: 'penguin', tagID: 'cute' };
                fixture.givenTagable({ resources: { penguin: resource }, tags: { cute: tag }, tagged: [tagged] });
                fixture.thenExportEquals('{"resources":{"penguin":{}},"tagged":[{"resourceID":"penguin","tagID":"cute"}],"tags":{"cute":{}}}');
            });
        });
    });
    describe('.getResources(...)', function () {
        context('with no data', function () {
            it('returns no data', function () {
            });
        });
        context('with a missing tag', function () {
            it('throws an error', function () {
                fixture.givenTagable();
                chai_1.expect(function () {
                    var resource = new Resource_1.Resource();
                    var tag = new Tag_1.Tag();
                    var tagged = { resourceID: 'penguin', tagID: 'cute' };
                    fixture.givenTagable({ resources: { penguin: resource }, tags: { cute: tag }, tagged: [tagged] });
                    fixture.thenGetResourcesEquals('ugly', {});
                }).to.throw(Error, "Unknown tag 'ugly'");
            });
        });
        context('with data', function () {
            it('returns tags', function () {
                var resource = new Resource_1.Resource();
                var tag = new Tag_1.Tag();
                var tagged = { resourceID: 'penguin', tagID: 'cute' };
                fixture.givenTagable({ resources: { penguin: resource }, tags: { cute: tag }, tagged: [tagged] });
                fixture.thenGetResourcesEquals('cute', { penguin: resource });
            });
        });
    });
    describe('.getTags(...)', function () {
        context('with no data', function () {
            it('returns no data', function () {
            });
        });
        context('with a missing resource', function () {
            it('throws an error', function () {
                fixture.givenTagable();
                chai_1.expect(function () {
                    var resource = new Resource_1.Resource();
                    var tag = new Tag_1.Tag();
                    var tagged = { resourceID: 'penguin', tagID: 'cute' };
                    fixture.givenTagable({ resources: { penguin: resource }, tags: { cute: tag }, tagged: [tagged] });
                    fixture.thenGetTagsEquals('unicorn', {});
                }).to.throw(Error, "Unknown resource 'unicorn'");
            });
        });
        context('with data', function () {
            it('returns tags', function () {
                var resource = new Resource_1.Resource();
                var tag = new Tag_1.Tag();
                var tagged = { resourceID: 'penguin', tagID: 'cute' };
                fixture.givenTagable({ resources: { penguin: resource }, tags: { cute: tag }, tagged: [tagged] });
                fixture.thenGetTagsEquals('penguin', { cute: tag });
            });
        });
    });
    describe('.import', function () {
        context('({})', function () {
            it('nothing is imported', function () {
                fixture.givenTagable();
                fixture.whenImportIsCalled({});
                fixture.thenResourcesEquals({});
                fixture.thenTagsEquals({});
                fixture.thenTaggedEquals([]);
            });
        });
        context('({..., ..., ...})', function () {
            it('everything is imported', function () {
                var resource = new Resource_1.Resource();
                var tag = new Tag_1.Tag();
                var tagged = { resourceID: 'penguin', tagID: 'cute' };
                fixture.givenTagable();
                fixture.whenImportIsCalled({ resources: { penguin: resource }, tags: { cute: tag }, tagged: [tagged] });
                fixture.thenResourcesEquals({ penguin: resource });
                fixture.thenTagsEquals({ cute: tag });
                fixture.thenTaggedEquals([tagged]);
            });
        });
    });
    describe('.tagResource(..., ...)', function () {
        context('with valid data', function () {
            it('tags the resource', function () {
                var resource = new Resource_1.Resource();
                var tag = new Tag_1.Tag();
                fixture.givenTagable({ resources: { penguin: resource }, tags: { cute: tag } });
                fixture.whenTagResourceIsCalled('penguin', 'cute');
                fixture.thenTaggedEquals([{ resourceID: 'penguin', tagID: 'cute' }]);
            });
        });
        context('with unknown resource', function () {
            it('throws', function () {
                var tag = new Tag_1.Tag();
                fixture.givenTagable({ tags: { cute: tag } });
                chai_1.expect(function () {
                    fixture.whenTagResourceIsCalled('penguin', 'cute');
                }).to.throw(Error, "Unknown resource 'penguin'");
            });
        });
        context('with unknown tag', function () {
            it('throws', function () {
                var resource = new Resource_1.Resource();
                fixture.givenTagable({ resources: { penguin: resource } });
                chai_1.expect(function () {
                    fixture.whenTagResourceIsCalled('penguin', 'cute');
                }).to.throw(Error, "Unknown tag 'cute'");
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
        this._tagable.tagResource({ resourceID: resourceID, tagID: tagID });
    };
    Fixture.prototype.thenExportEquals = function (exported) {
        chai_1.expect(this._tagable.export()).to.equal(exported);
    };
    Fixture.prototype.thenGetResourcesEquals = function (tagID, resources) {
        chai_1.expect(this._tagable.getResources(tagID)).to.deep.equal(resources);
    };
    Fixture.prototype.thenGetTagsEquals = function (resourceID, tags) {
        chai_1.expect(this._tagable.getTags(resourceID)).to.deep.equal(tags);
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