import { Resource } from './Resource';
import { Tag } from './Tag';
import { Tagged } from './Tagged';
export interface TagableData {
    resources?: Resource[];
    tagged?: Tagged[];
    tags?: Tag[];
}
export declare class Tagable {
    private _resources;
    private _tagged;
    private _tags;
    constructor(data?: TagableData);
    readonly resources: object[];
    readonly tagged: object[];
    readonly tags: object[];
    import(data: TagableData): void;
    export(): string;
    addResource(resource: Resource): void;
    getResourceBy(property: string, value: any): Resource | undefined;
    addTag(tag: Tag): void;
    getTagBy(property: string, value: any): Tag | undefined;
    tagResource(resource: Resource, tag: Tag): void;
    getTagsByResourceID(id: string): void;
    getResourcesByTagID(id: string): void;
}
//# sourceMappingURL=Tagable.d.ts.map