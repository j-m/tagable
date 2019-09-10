import { generateResourceID } from './ID'

export class Resource {
  public id: string = generateResourceID()
  constructor(
    public source: string) {
  }
}
