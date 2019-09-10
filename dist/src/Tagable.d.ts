import { Resource } from './Resource';
import { Tag } from './Tag';
import { Tagged } from './Tagged';
export declare class Tagable {
    private _resources;
    private _tags;
    private _tagged;
    constructor(resources?: Resource[], tags?: Tag[], tagged?: Tagged[]);
    readonly resources: object[];
    readonly tags: object[];
    import(data: {
        tags: Tag[];
        tagged: Tagged[];
        resources: Resource[];
    }): void;
    export(): string;
    load(path: string): void;
    save(path: string): void;
    addResource(resource: Resource): void;
    getResourceBy(property: string, value: any): Resource | undefined;
    addTag(tag: Tag): void;
    getTagBy(property: string, value: any): Tag | undefined;
    tagResource(resource: Resource, tag: Tag): void;
}
//# sourceMappingURL=Tagable.d.ts.map