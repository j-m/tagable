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
    readonly tagged: Tagged[];
    readonly tags: Tags;
    import(data: TagableData): void;
    export(): string;
    addResource<R = any>(resourceID: string, resource: Resource<R>): void;
    addTag<T = any>(tagID: string, tag: Tag<T>): void;
    tagResource(tagged: Tagged): void;
    getTags<T = any>(resourceID: string): Array<Tag<T>>;
    getResources<R = any>(tagID: string): Array<Resource<R>>;
}
//# sourceMappingURL=Tagable.d.ts.map