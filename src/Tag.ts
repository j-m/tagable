enum Relation {
  Parent,
  Similar,
  Children,
  Inverse,
}

export interface Relationships {
  [Relation.Parent]?: string,
  [Relation.Similar]?: string[],
  [Relation.Children]?: string[],
  [Relation.Inverse]?: string[]
}

export class Tag<T = any> {
  constructor(
    public data?: T,
    public relationships?: Relationships) {
  }
}
