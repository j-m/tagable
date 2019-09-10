import { generateTagID } from './ID'

enum Relation {
  Parent,
  Similar,
  Child,
  Inverse
}

export class Tag {
  public id: string = generateTagID()
  constructor(
    public title: string,
    public description?: string,
    public imageURL?: string,
    public relationships?: Array<[string, Relation]>) {
  }
}
