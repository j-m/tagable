import { expect } from 'chai'

import { Resource } from '../src/Resource'
import { Tag } from '../src/Tag'
import { Tagable, TagableData } from '../src/Tagable'
import { Tagged } from '../src/Tagged'

let fixture: Fixture

describe('Tagable', () => {
  beforeEach(() => {
    fixture = new Fixture()
  })

  describe('constructor', () => {
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
        fixture.thenResourcesEquals([])
      })
    })
    context('with initialised data', () => {
      it('returns initialised data', () => {
        const resource: Resource = new Resource("penguin")
        fixture.givenTagable({resources: [resource]})
        fixture.thenResourcesEquals([resource])
      })
    })
    context('with imported data', () => {
      it('returns imported data', () => {
        const resource: Resource = new Resource("penguin")
        fixture.givenTagable()
        fixture.whenImportIsCalled({resources: [resource]})
        fixture.thenResourcesEquals([resource])
      })
    })
    context('with added data', () => {
      it('returns added data', () => {
        const resource: Resource = new Resource("penguin")
        fixture.givenTagable()
        fixture.whenAddResourceIsCalled(resource)
        fixture.thenResourcesEquals([resource])
      })
    })
  })

  describe('.tags', () => {
    context('with no data', () => {
      it('returns an empty array', () => {
        fixture.givenTagable()
        fixture.thenTagsEquals([])
      })
    })
    context('with initialised data', () => {
      it('returns initialised data', () => {
        const tag: Tag = new Tag("cute")
        fixture.givenTagable({tags: [tag]})
        fixture.thenTagsEquals([tag])
      })
    })
    context('with imported data', () => {
      it('returns imported data', () => {
        const tag: Tag = new Tag("cute")
        fixture.givenTagable()
        fixture.whenImportIsCalled({tags: [tag]})
        fixture.thenTagsEquals([tag])
      })
    })
    context('with added data', () => {
      it('returns added data', () => {
        const tag: Tag = new Tag("cute")
        fixture.givenTagable()
        fixture.whenAddTagIsCalled(tag)
        fixture.thenTagsEquals([tag])
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
        const tagged: Tagged = new Tagged("r123", "t123")
        fixture.givenTagable({tagged: [tagged]})
        fixture.thenTaggedEquals([tagged])
      })
    })
    context('with imported data', () => {
      it('returns imported data', () => {
        const tagged: Tagged = new Tagged("r123", "t123")
        fixture.givenTagable()
        fixture.whenImportIsCalled({tagged: [tagged]})
        fixture.thenTaggedEquals([tagged])
      })
    })
    context('with new tagged resource', () => {
      it('returns generated tagged', () => {
        const resource: Resource = new Resource("penguin")
        const tag: Tag = new Tag("cute")
        fixture.givenTagable()
        fixture.whenAddResourceIsCalled(resource)
        fixture.whenAddTagIsCalled(tag)
        fixture.whenTagResourceIsCalled(resource, tag)
        fixture.thenTaggedEquals([{resourceID: resource.id, tagID: tag.id}])
      })
    })
  })
})

class Fixture {
  private _tagable: Tagable | undefined

  public givenTagable(data?: TagableData) { 
    this._tagable = new Tagable(data)
  }

  public whenAddResourceIsCalled(resource: Resource) {
    this._tagable!.addResource(resource)
  }

  public whenAddTagIsCalled(tag: Tag) {
    this._tagable!.addTag(tag)
  }

  public whenImportIsCalled(data: TagableData) {
    this._tagable!.import(data)
  }

  public whenTagResourceIsCalled(resource: Resource, tag: Tag) {
    this._tagable!.tagResource(resource, tag)
  }

  public thenResourcesEquals(resources: Resource[]) {
    expect(this._tagable!.resources).to.deep.equal(resources)
  }

  public thenTaggedEquals(tagged: Tagged[]) {
    expect(this._tagable!.tagged).to.deep.equal(tagged)
  }

  public thenTagsEquals(tags: Tag[]) {
    expect(this._tagable!.tags).to.deep.equal(tags)
  }

  public thenTagableExists() {
    expect(this._tagable).to.exist
  }
}
