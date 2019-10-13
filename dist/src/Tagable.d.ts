import { Resource } from './Resource';
import { Tag } from './Tag';
export declare type Resources<R> = {
    [key: string]: Resource<R>;
};
export declare type Tags<T> = {
    [key: string]: Tag<T>;
};
export declare type Tagged = {
    resourceID: string;
    tagID: string;
};
export interface TagableData<R, T> {
    resources?: Resources<R>;
    tags?: Tags<T>;
    tagged?: Tagged[];
}
export declare class Tagable<R = any, T = any> {
    private _tagged;
    private _resources;
    private _tags;
    constructor(data?: TagableData<R, T>);
    readonly resources: Resources<R>;
    readonly tagged: Tagged[];
    readonly tags: Tags<T>;
    import(data: TagableData<R, T>): void;
    export(): string;
    addResource(resourceID: string, resource: Resource<R>): void;
    addTag(tagID: string, tag: Tag<T>): void;
    tagResource(tagged: Tagged): void;
    getTags(resourceID: string): Tags<T>;
    getResources(tagID: string): Resources<R>;
}
//# sourceMappingURL=Tagable.d.ts.map