import { expect } from 'chai'

import { Resource } from '../src/Resource'
import { Tag } from '../src/Tag'
import { Resources, Tagable, TagableData, Tagged, Tags } from '../src/Tagable'

let fixture: Fixture

describe('Tagable', () => {
  beforeEach(() => {
    fixture = new Fixture()
  })

  describe('new', () => {
    context('()', () => {
      it('initialises', () => {
        fixture.givenTagable()
        fixture.thenTagableExists()
      })
    })
  })

  describe('.resources', () => {
    context('with no data', () => {
      it('returns an empty array', () => {
        fixture.givenTagable()
        fixture.thenResourcesEquals({})
      })
    })
    context('with initialised data', () => {
      it('returns initialised data', () => {
        const resource: Resource = new Resource('penguin')
        fixture.givenTagable({resources: {penguin: resource}})
        fixture.thenResourcesEquals({penguin: resource})
      })
    })
    context('with imported data', () => {
      it('returns imported data', () => {
        const resource: Resource = new Resource('penguin')
        fixture.givenTagable()
        fixture.whenImportIsCalled({resources: {penguin: resource}})
        fixture.thenResourcesEquals({penguin: resource})
      })
    })
    context('with added data', () => {
      it('returns added data', () => {
        const resource: Resource = new Resource('penguin')
        fixture.givenTagable()
        fixture.whenAddResourceIsCalled('penguin', resource)
        fixture.thenResourcesEquals({penguin: resource})
      })
    })
  })

  describe('.tagged', () => {
    context('with no data', () => {
      it('returns an empty array', () => {
        fixture.givenTagable()
        fixture.thenTaggedEquals([])
      })
    })
    context('with initialised data', () => {
      it('returns initialised data', () => {
        const tagged = {resourceID: 'r123', tagID: 't123'}
        fixture.givenTagable({tagged: [tagged]})
        fixture.thenTaggedEquals([tagged])
      })
    })
    context('with imported data', () => {
      it('returns imported data', () => {
        const tagged = {resourceID: 'r123', tagID: 't123'}
        fixture.givenTagable()
        fixture.whenImportIsCalled({tagged: [tagged]})
        fixture.thenTaggedEquals([tagged])
      })
    })
    context('with new tagged resource', () => {
      it('returns generated tagged', () => {
        const resource: Resource = new Resource('penguin')
        const tag: Tag = new Tag('cute')
        fixture.givenTagable()
        fixture.whenAddResourceIsCalled('penguin', resource)
        fixture.whenAddTagIsCalled('cute', tag)
        fixture.whenTagResourceIsCalled('penguin', 'cute')
        fixture.thenTaggedEquals([{resourceID: 'penguin', tagID: 'cute'}])
      })
    })
  })

  describe('.tags', () => {
    context('with no data', () => {
      it('returns an empty array', () => {
        fixture.givenTagable()
        fixture.thenTagsEquals({})
      })
    })
    context('with initialised data', () => {
      it('returns initialised data', () => {
        const tag: Tag = new Tag('cute')
        fixture.givenTagable({tags: {cute: tag}})
        fixture.thenTagsEquals({cute: tag})
      })
    })
    context('with imported data', () => {
      it('returns imported data', () => {
        const tag: Tag = new Tag('cute')
        fixture.givenTagable()
        fixture.whenImportIsCalled({tags: {cute: tag}})
        fixture.thenTagsEquals({cute: tag})
      })
    })
    context('with added data', () => {
      it('returns added data', () => {
        const tag: Tag = new Tag('cute')
        fixture.givenTagable()
        fixture.whenAddTagIsCalled('cute', tag)
        fixture.thenTagsEquals({cute: tag})
      })
    })
  })

  describe('.addResource', () => {
    context('(unused, resource)', () => {
      it('adds the resource', () => {
        const resource: Resource = new Resource()
        fixture.givenTagable()
        fixture.whenAddResourceIsCalled('penguin', resource)
        fixture.thenResourcesEquals({penguin: resource})
      })
    })
    context('(used, resource)', () => {
      it('throws', () => {
        const resource: Resource = new Resource()
        fixture.givenTagable({resources: {penguin: resource}})
        expect(() => {
          fixture.whenAddResourceIsCalled('penguin', resource)
        }).to.throw(Error, `Resource ID 'penguin' is already in use`)
      })
    })
  })

  describe('.addTag', () => {
    context('(unused, tag)', () => {
      it('adds the tag', () => {
        const tag: Tag = new Tag()
        fixture.givenTagable()
        fixture.whenAddTagIsCalled('cute', tag)
        fixture.thenTagsEquals({cute: tag})
      })
    })
    context('(used, tag)', () => {
      it('throws', () => {
        const tag: Tag = new Tag()
        fixture.givenTagable({tags: {cute: tag}})
        expect(() => {
          fixture.whenAddTagIsCalled('cute', tag)
        }).to.throw(Error, `Tag ID 'cute' is already in use`)
      })
    })
  })

  describe('.export', () => {
    context('({})', () => {
      it('nothing is exported', () => {
        fixture.givenTagable()
        fixture.thenExportEquals('{"resources":{},"tagged":[],"tags":{}}')
      })
    })
    context('({..., ..., ...})', () => {
      it('everything is exported', () => {
        const resource: Resource = new Resource()
        const tag: Tag = new Tag()
        const tagged: Tagged = {resourceID: 'penguin', tagID: 'cute'}
        fixture.givenTagable({resources: {penguin: resource}, tags: {cute: tag}, tagged: [tagged]})
        fixture.thenExportEquals('{"resources":{"penguin":{}},"tagged":[{"resourceID":"penguin","tagID":"cute"}],"tags":{"cute":{}}}')
      })
    })
  })

  describe('.getResources(...)', () => {
    context('with no data', () => {
      it('returns no data', () => {
        // fixture.givenTagable()
        // fixture.thenGetResourcesEquals('penguin', [])
      })
    })
    context('with a missing tag', () => {
      it('throws an error', () => {
        fixture.givenTagable()
        const resource: Resource = new Resource()
        const tag: Tag = new Tag()
        const tagged: Tagged = {resourceID: 'penguin', tagID: 'cute'}
        fixture.givenTagable({resources: {penguin: resource}, tags: {cute: tag}, tagged: [tagged]})
        expect(() => {
          fixture.thenGetResourcesEquals('ugly', {})
        }).to.throw(ReferenceError, `Unknown tag 'ugly'`)
      })
    })
    context('with no resources', () => {
      it('returns an empty object', () => {
        fixture.givenTagable()
        const resource: Resource = new Resource()
        const tag: Tag = new Tag()
        const tagged: Tagged = {resourceID: 'unicorn', tagID: 'magical'}
        fixture.givenTagable({resources: {penguin: resource}, tags: {cute: tag}, tagged: [tagged]})
        fixture.thenGetResourcesEquals('cute', {})
      })
    })
    context('with data', () => {
      it('returns tags', () => {
        const resource: Resource = new Resource()
        const tag: Tag = new Tag()
        const tagged: Tagged = {resourceID: 'penguin', tagID: 'cute'}
        fixture.givenTagable({resources: {penguin: resource}, tags: {cute: tag}, tagged: [tagged]})
        fixture.thenGetResourcesEquals('cute', {penguin: resource})
      })
    })
  })

  describe('.getTags(...)', () => {
    context('with no data', () => {
      it('returns no data', () => {
        // fixture.givenTagable()
        // fixture.thenGetTagsEquals('cute', [])
      })
    })
    context('with a missing resource', () => {
      it('throws an error', () => {
        fixture.givenTagable()
        const resource: Resource = new Resource()
        const tag: Tag = new Tag()
        const tagged: Tagged = {resourceID: 'penguin', tagID: 'cute'}
        fixture.givenTagable({resources: {penguin: resource}, tags: {cute: tag}, tagged: [tagged]})
        expect(() => {
          fixture.thenGetTagsEquals('unicorn', {})
        }).to.throw(ReferenceError, `Unknown resource 'unicorn'`)
      })
    })
    context('with no tags', () => {
      it('returns an empty object', () => {
        fixture.givenTagable()
        const resource: Resource = new Resource()
        const tag: Tag = new Tag()
        const tagged: Tagged = {resourceID: 'unicorn', tagID: 'magical'}
        fixture.givenTagable({resources: {penguin: resource}, tags: {cute: tag}, tagged: [tagged]})
        fixture.thenGetTagsEquals('penguin', {})
      })
    })
    context('with data', () => {
      it('returns tags', () => {
        const resource: Resource = new Resource()
        const tag: Tag = new Tag()
        const tagged: Tagged = {resourceID: 'penguin', tagID: 'cute'}
        fixture.givenTagable({resources: {penguin: resource}, tags: {cute: tag}, tagged: [tagged]})
        fixture.thenGetTagsEquals('penguin', {cute: tag})
      })
    })
  })

  describe('.import', () => {
    context('({})', () => {
      it('nothing is imported', () => {
        fixture.givenTagable()
        fixture.whenImportIsCalled({})
        fixture.thenResourcesEquals({})
        fixture.thenTagsEquals({})
        fixture.thenTaggedEquals([])
      })
    })
    context('({..., ..., ...})', () => {
      it('everything is imported', () => {
        const resource: Resource = new Resource()
        const tag: Tag = new Tag()
        const tagged: Tagged = {resourceID: 'penguin', tagID: 'cute'}
        fixture.givenTagable()
        fixture.whenImportIsCalled({resources: {penguin: resource}, tags: {cute: tag}, tagged: [tagged]})
        fixture.thenResourcesEquals({penguin: resource})
        fixture.thenTagsEquals({cute: tag})
        fixture.thenTaggedEquals([tagged])
      })
    })
  })

  describe('.tagResource(..., ...)', () => {
    context('with valid data', () => {
      it('tags the resource', () => {
        const resource: Resource = new Resource()
        const tag: Tag = new Tag()
        fixture.givenTagable({resources: {penguin: resource}, tags: {cute: tag}})
        fixture.whenTagResourceIsCalled('penguin', 'cute')
        fixture.thenTaggedEquals([{resourceID: 'penguin', tagID: 'cute'}])
      })
    })
    context('with unknown resource', () => {
      it('throws', () => {
        const tag: Tag = new Tag()
        fixture.givenTagable({tags: {cute: tag}})
        expect(() => {
          fixture.whenTagResourceIsCalled('penguin', 'cute')
        }).to.throw(ReferenceError, `Unknown resource 'penguin'`)
      })
    })
    context('with unknown tag', () => {
      it('throws', () => {
        const resource: Resource = new Resource()
        fixture.givenTagable({resources: {penguin: resource}})
        expect(() => {
          fixture.whenTagResourceIsCalled('penguin', 'cute')
        }).to.throw(ReferenceError, `Unknown tag 'cute'`)
      })
    })
  })

})

class Fixture {
  private _tagable: Tagable | undefined

  public givenTagable<R = any, T = any>(data?: TagableData<R, T>) {
    this._tagable = new Tagable<R, T>(data)
  }

  public whenAddResourceIsCalled(id: string, resource: Resource) {
    this._tagable!.addResource(id, resource)
  }

  public whenAddTagIsCalled(id: string, tag: Tag) {
    this._tagable!.addTag(id, tag)
  }

  public whenImportIsCalled<R = any, T = any>(data: TagableData<R, T>) {
    this._tagable!.import(data)
  }

  public whenTagResourceIsCalled(resourceID: string, tagID: string) {
    this._tagable!.tagResource({resourceID, tagID})
  }

  public thenExportEquals(exported: string) {
    expect(this._tagable!.export()).to.equal(exported)
  }

  public thenGetResourcesEquals<R = any>(tagID: string, resources: Resources<R>) {
    expect(this._tagable!.getResources(tagID)).to.deep.equal(resources)
  }

  public thenGetTagsEquals<T = any>(resourceID: string, tags: Tags<T>) {
    expect(this._tagable!.getTags(resourceID)).to.deep.equal(tags)
  }

  public thenResourcesEquals<R = any>(resources: Resources<R>) {
    expect(this._tagable!.resources).to.deep.equal(resources)
  }

  public thenTaggedEquals(tagged: Tagged[]) {
    expect(this._tagable!.tagged).to.deep.equal(tagged)
  }

  public thenTagsEquals<T = any>(tags: Tags<T>) {
    expect(this._tagable!.tags).to.deep.equal(tags)
  }

  public thenTagableExists() {
    // tslint:disable-next-line: no-unused-expression
    expect(this._tagable).to.exist
  }
}
