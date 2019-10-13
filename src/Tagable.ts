import { OatyArray } from 'oaty'

import { Resource } from './Resource'
import { Tag } from './Tag'

export type Resources<R> = {[key: string]: Resource<R>}
export type Tags<T> = {[key: string]: Tag<T>}
export type Tagged = {resourceID: string, tagID: string}

export interface TagableData<R, T> {
  resources?: Resources<R>
  tags?: Tags<T>
  tagged?: Tagged[]
}

export class Tagable<R = any, T = any> {
  private _tagged: OatyArray<Tagged>
  private _resources: Resources<R>
  private _tags: Tags<T>

  constructor(data: TagableData<R, T> = {}) {
    this._tags = data.tags || {}
    this._resources = data.resources || {}
    this._tagged = new OatyArray<Tagged>(data.tagged)
  }

  get resources(): Resources<R> {
    return this._resources
  }

  get tagged(): Tagged[] {
    return this._tagged.data
  }

  get tags(): Tags<T> {
    return this._tags
  }

  public import(data: TagableData<R, T>) {
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

  public addResource(resourceID: string, resource: Resource<R>) {
    if (this._resources[resourceID]) {
      throw Error(`Resource ID '${resourceID}' is already in use`)
    }
    this._resources[resourceID] = resource
  }

  public addTag(tagID: string, tag: Tag<T>) {
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

  public getTags(resourceID: string): Tags<T> {
    const tagged: Tagged[] = this._tagged.get('resourceID', resourceID) as Tagged[]
    if (tagged === undefined) {
      throw Error(`Unknown resource '${resourceID}'`)
    }
    const result: Tags<T> = {}
    tagged.forEach((tag) => {result[tag.tagID] = this._tags[tag.tagID]})
    return result
  }

  public getResources(tagID: string): Resources<R> {
    const tagged: Tagged[] = this._tagged.get('tagID', tagID) as Tagged[]
    if (tagged === undefined) {
      throw Error(`Unknown tag '${tagID}'`)
    }
    const result: Resources<R> = {}
    tagged.forEach((tag) => {result[tag.resourceID] = this._resources[tag.resourceID]})
    return result
  }
}
