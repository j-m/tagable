enum Relation {
  Parent,
  Similar,
  Child,
  Inverse
}

export class Tag {
  constructor(
    public id: string,
    public data?: any,
    public relationships?: Array<[string, Relation]>) {
  }
}
