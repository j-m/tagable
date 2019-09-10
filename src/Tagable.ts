import { readFileSync, writeFileSync } from 'fs'

import { OatyArray } from 'oaty'

import { generateResourceID, generateTagID } from './ID'
import { Resource } from './Resource'
import { Tag } from './Tag'
import { Tagged } from './Tagged'

export class Tagable {
  private _resources: OatyArray
  private _tags: OatyArray
  private _tagged: OatyArray

  constructor(resources: Resource[] = [], tags: Tag[] = [], tagged: Tagged[] = []) 
  {
    this._resources = new OatyArray(resources)
    this._tags = new OatyArray(tags)
    this._tagged = new OatyArray(tagged)
  }
  
  get resources() {
    return this._resources.data
  }

  get tags() {
    return this._tags.data
  }

  public import(data: {tags: Tag[], tagged: Tagged[], resources: Resource[]}) {
    this._tags.push(...data.tags)
    this._tagged.push(...data.tagged)
    this._resources.push(...data.resources)
  }

  public export(): string {
    return JSON.stringify({
      tags: this._tags.data,
      tagged: this._tagged.data,
      resources: this._resources.data
    })
  }

  public load(path: string) {
    const data: {tags: Tag[], tagged: Tagged[], resources: Resource[]} = JSON.parse(readFileSync(path, 'utf-8'))
    this.import(data)
  }

  public save(path: string) {
    writeFileSync(path, this.export());
  }

  public addResource(resource: Resource) {
    if (this._resources.get('id', resource.id)) {
      resource.id = generateResourceID()
    }
    this._resources.push(resource)
  }

  public getResourceBy(property: string, value: any): Resource | undefined {
    return this._resources.get(property, value)
  }

  public addTag(tag: Tag) {
    if (this._tags.get('id', tag.id)) {
      tag.id = generateTagID()
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
