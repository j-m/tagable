import { readFileSync, writeFileSync } from 'fs'

import { OatyArray } from 'oaty'

import { generateResourceID, generateTagID } from './ID'
import { Resource } from './Resource'
import { Tag } from './Tag'
import { Tagged } from './Tagged'

export interface TagableData {
  resources?: Resource[]
  tagged?: Tagged[]
  tags?: Tag[]
}

export class Tagable {
  private _resources: OatyArray
  private _tagged: OatyArray
  private _tags: OatyArray

  constructor(data: TagableData = {}) {
    this._resources = new OatyArray(data.resources || [])
    this._tagged = new OatyArray(data.tagged || [])
    this._tags = new OatyArray(data.tags || [])
  }
  
  get resources() {
    return this._resources.data
  }

  get tagged() {
    return this._tagged.data
  }

  get tags() {
    return this._tags.data
  }

  public import(data: TagableData) {
    if (data.tags){ this._tags.push(...data.tags) }
    if (data.tagged){ this._tagged.push(...data.tagged) }
    if (data.resources){ this._resources.push(...data.resources) }
  }

  public export(): string {
    return JSON.stringify({
      tags: this.tags,
      tagged: this.tagged,
      resources: this.resources
    })
  }

  public load(path: string) {
    const data: TagableData = JSON.parse(readFileSync(path, 'utf-8'))
    this.import(data)
  }

  public save(path: string) {
    writeFileSync(path, this.export());
  }

  public addResource(resource: Resource) {
    if (this._resources.get('id', resource.id)) {
      resource.id = generateResourceID(this._resources.get('id'))
    }
    this._resources.push(resource)
  }

  public getResourceBy(property: string, value: any): Resource | undefined {
    return this._resources.get(property, value)
  }

  public addTag(tag: Tag) {
    if (this._tags.get('id', tag.id)) {
      tag.id = generateTagID(this._tags.get('id'))
    }
    this._tags.push(tag)
  }

  public getTagBy(property: string, value: any): Tag | undefined {
    return this._tags.get(property, value)
  }

  public tagResource(resource: Resource, tag: Tag) {
    this._tagged.push(new Tagged(resource.id, tag.id))
  }
}
