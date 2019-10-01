import { OatyArray } from 'oaty'

import { Resource } from './Resource'
import { Tag } from './Tag'

export interface IResources {[key: string]: Resource<any>}
export interface ITags {[key: string]: Tag<any>}
export interface ITagged {resourceID: string, tagID: string}

export interface ITagableData {
  resources?: IResources
  tags?: ITags
  tagged?: ITagged[]
}

export class Tagable {
  private _tagged: OatyArray
  private _resources: IResources
  private _tags: ITags

  constructor(data: ITagableData = {}) {
    this._tags = data.tags || {}
    this._resources = data.resources || {}
    this._tagged = new OatyArray(data.tagged || [])
  }

  get resources(): IResources {
    return this._resources
  }

  get tagged() {
    return this._tagged.data
  }

  get tags(): ITags {
    return this._tags
  }

  public import(data: ITagableData) {
    Object.assign(this._tags, data.tags)
    Object.assign(this._resources, data.resources)
    this._tagged.push(data.tagged || [])
  }

  public export(): string {
    return JSON.stringify({
      tags: this.tags,
      tagged: this.tagged,
      resources: this.resources
    })
  }

  public addResource<R>(resourceID: string, resource: Resource<R>) {
    if (this._resources[resourceID]) {
      throw Error(`Resource ID '${resourceID}' is already in use`)
    }
    this._resources[resourceID] = resource
  }

  public addTag<T>(tagID: string, tag: Tag<T>) {
    if (this._resources[tagID]) {
      throw Error(`Tag ID '${tagID}' is already in use`)
    }
    this._tags[tagID] = tag
  }

  public tagResource(tagged: Tagged) {
    this._tagged.push(tagged)
  }

  public getTags(resourceID: string): Tag<any>[] {
    const tagged = this._tagged.get('resourceID', resourceID)
    return tagged.map((tag: Tagged) => (this._tags[tag.tagID]))
  }

  public getResources(tagID: string): Resource<any>[] {
    const tagged = this._tagged.get('tagID', tagID)
    return tagged.map((tag: Tagged) => (this._resources[tag.resourceID]))
  }
}
