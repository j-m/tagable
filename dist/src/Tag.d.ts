declare enum Relation {
    Parent = 0,
    Similar = 1,
    Children = 2,
    Inverse = 3
}
export interface Relationships {
    [Relation.Parent]?: string;
    [Relation.Similar]?: string[];
    [Relation.Children]?: string[];
    [Relation.Inverse]?: string[];
}
export declare class Tag<T = any> {
    data?: T | undefined;
    relationships?: Relationships | undefined;
    constructor(data?: T | undefined, relationships?: Relationships | undefined);
}
export {};
//# sourceMappingURL=Tag.d.ts.map