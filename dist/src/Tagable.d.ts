import { Resource } from './Resource';
import { Tag } from './Tag';
export declare type Resources = {
    [key: string]: Resource<any>;
};
export declare type Tags = {
    [key: string]: Tag<any>;
};
export declare type Tagged = {
    resourceID: string;
    tagID: string;
};
export interface TagableData {
    resources?: Resources;
    tags?: Tags;
    tagged?: Tagged[];
}
export declare class Tagable {
    private _tagged;
    private _resources;
    private _tags;
    constructor(data?: TagableData);
    readonly resources: Resources;
    readonly tagged: object[];
    readonly tags: Tags;
    import(data: TagableData): void;
    export(): string;
    addResource<R>(resourceID: string, resource: Resource<R>): void;
    addTag<T>(tagID: string, tag: Tag<T>): void;
    tagResource(resourceID: string, tagID: string): void;
    getTags(resourceID: string): Tag<any>[];
    getResources(tagID: string): Resource<any>[];
}
//# sourceMappingURL=Tagable.d.ts.map