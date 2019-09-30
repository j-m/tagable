declare enum Relation {
    Parent = 0,
    Similar = 1,
    Child = 2,
    Inverse = 3
}
export declare class Tag {
    id: string;
    data?: any;
    relationships?: [string, Relation][] | undefined;
    constructor(id: string, data?: any, relationships?: [string, Relation][] | undefined);
}
export {};
//# sourceMappingURL=Tag.d.ts.map