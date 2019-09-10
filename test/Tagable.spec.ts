import { expect } from 'chai'
import { Tagable } from '../src/Tagable'

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
})

class Fixture {
  private _tagable: Tagable | undefined

  public givenTagable() { 
    this._tagable = new Tagable()
  }

  public thenTagableExists() {
    expect(this._tagable).to.exist
  }
}
