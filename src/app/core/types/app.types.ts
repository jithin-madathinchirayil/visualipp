import { IObject } from "@core/interfaces/app.interface";

export type ButtonGroupItem = {
    label?: string;
    value: string;
    disabled?: boolean;
    icon?: string;
}

export type LayoutColumn = {
    name: string;
    type: string;
    icon?: string;
    value?: number;
    items?:LayoutColumn[];
    content?: Layout;
    parent?: string;
}

export type Layout = {
    uid: string;
    name: string;
    type: string;
    child: Layout[];
}

export type PageTypes = 'section' | 'div' | 'button' | 'buttonGroup' | 'column' | 'layout' | 'text';

export type GenericObject = IObject;