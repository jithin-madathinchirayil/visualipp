import { PageTypes } from "@core/types/app.types";

export interface IResize {
    width?: number;
    height?: number;
}

export interface IAppSchema {
    name: string;
    description?: string;
    author?: string;
    version?: string;
    icon?: string;
    appType?: string[];
}

export interface IPageSchema {
    name: string;
    controlName: string;
    uid: string;
    type: PageTypes;
    controlProps: any[];
    computedStyles: any;
    child: IPageSchema[];
}

export interface IElement {
    name:string;
    type:string;
    icon:string;
}

export interface IObject {
    [key: string]: unknown;
}

