import { expect } from 'chai'

import { Resource } from '../src/Resource'
import { Tag } from '../src/Tag'
import { Resources, Tagable, TagableData, Tagged, Tags } from '../src/Tagable'

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
})

class Fixture {
  private _tagable: Tagable | undefined

  public givenTagable(data?: TagableData) {
    this._tagable = new Tagable(data)
  }

  public whenAddResourceIsCalled(id: string, resource: Resource) {
    this._tagable!.addResource(id, resource)
  }

  public whenAddTagIsCalled(id: string, tag: Tag) {
    this._tagable!.addTag(id, tag)
  }

  public whenImportIsCalled(data: TagableData) {
    this._tagable!.import(data)
  }

  public whenTagResourceIsCalled(resourceID: string, tagID: string) {
    this._tagable!.tagResource({resourceID, tagID})
  }

  public thenResourcesEquals(resources: Resources) {
    expect(this._tagable!.resources).to.deep.equal(resources)
  }

  public thenTaggedEquals(tagged: Tagged[]) {
    expect(this._tagable!.tagged).to.deep.equal(tagged)
  }

  public thenTagsEquals(tags: Tags) {
    expect(this._tagable!.tags).to.deep.equal(tags)
  }

  public thenTagableExists() {
    expect(this._tagable).to.exist
  }
}
