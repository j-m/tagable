declare enum Relation {
    Parent = 0,
    Similar = 1,
    Child = 2,
    Inverse = 3
}
export declare class Tag {
    title: string;
    description?: string | undefined;
    imageURL?: string | undefined;
    relationships?: [string, Relation][] | undefined;
    id: string;
    constructor(title: string, description?: string | undefined, imageURL?: string | undefined, relationships?: [string, Relation][] | undefined);
}
export {};
//# sourceMappingURL=Tag.d.ts.map