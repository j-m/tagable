import { OatyArray } from 'oaty'

import { Resource } from './Resource'
import { Tag } from './Tag'

export type Resources = {[key: string]: Resource<any>}
export type Tags = {[key: string]: Tag<any>}
export type Tagged = {resourceID: string, tagID: string}

export interface TagableData {
  resources?: Resources
  tags?: Tags
  tagged?: Tagged[]
}

export class Tagable {
  private _tagged: OatyArray<Tagged>
  private _resources: Resources
  private _tags: Tags

  constructor(data: TagableData = {}) {
    this._tags = data.tags || {}
    this._resources = data.resources || {}
    this._tagged = new OatyArray<Tagged>(data.tagged)
  }

  get resources(): Resources {
    return this._resources
  }

  get tagged(): Tagged[] {
    return this._tagged.data
  }

  get tags(): Tags {
    return this._tags
  }

  public import(data: TagableData) {
    Object.assign(this._tags, data.tags)
    Object.assign(this._resources, data.resources)
    this._tagged.push(...data.tagged || [])
  }

  public export(): string {
    return JSON.stringify({
      resources: this.resources,
      tagged: this.tagged,
      tags: this.tags
    })
  }

  public addResource<R = any>(resourceID: string, resource: Resource<R>) {
    if (this._resources[resourceID]) {
      throw Error(`Resource ID '${resourceID}' is already in use`)
    }
    this._resources[resourceID] = resource
  }

  public addTag<T = any>(tagID: string, tag: Tag<T>) {
    if (this._tags[tagID]) {
      throw Error(`Tag ID '${tagID}' is already in use`)
    }
    this._tags[tagID] = tag
  }

  public tagResource(tagged: Tagged) {
    if (this._resources[tagged.resourceID] === undefined) {
      throw Error(`Unknown resource '${tagged.resourceID}'`)
    }
    if (this._tags[tagged.tagID] === undefined) {
      throw Error(`Unknown tag '${tagged.tagID}'`)
    }
    this._tagged.push(tagged)
  }

  public getTags<T = any>(resourceID: string): Array<Tag<T>> {
    const tagged: Tagged[] = this._tagged.get('resourceID', resourceID) as Tagged[]
    return tagged.map((tag: Tagged) => (this._tags[tag.tagID]))
  }

  public getResources<R = any>(tagID: string): Array<Resource<R>> {
    const tagged: Tagged[] = this._tagged.get('tagID', tagID) as Tagged[]
    return tagged.map((tag: Tagged) => (this._resources[tag.resourceID]))
  }
}
