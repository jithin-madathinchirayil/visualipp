import { STYLE_DEFAULTS } from '@core/config/app.const';
import { v4 as uuidv4 } from 'uuid';
import pageData from '@core/json/page.json';
import columnData from '@core/json/column.json';
import buttonData from '@core/json/button.json';

export class PageSchema {
    public name: string | undefined;
    public type: string | undefined;
    public uid: string | undefined;
    public child: PageSchema[] = [];
    public classList: string[] = [];
    public styleProps: any[] = [];
    public styleValues: any = {};
    constructor(option: {
        name: string,
        type: string,
        child?: PageSchema[]
    }) {
        this.name = option.name;
        this.type = option.type;
        this.child = option.child || [];
        this.uid = uuidv4();
        this.init();
    }

    private init(): void {
        switch(this.type) {
            case 'page': this.styleProps = pageData.styleProps;
            break;
            case 'column': this.styleProps = columnData.styleProps;
            break;
            case 'button': this.styleProps = buttonData.styleProps;
            break;
        }
    }
}

export class DimensionStyles {
    width: number;
    height: number;
    widthUnit: string;
    heightUnit: string;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number
    };
    marginUnit: string;
    padding: {
        top: number;
        right: number;
        bottom: number;
        left: number
    };
    paddingUnit: string

    constructor(option: {
        width: number,
        height: number,
        widthUnit: string,
        heightUnit: string,
        margin: {
            top: number,
            right: number,
            bottom: number,
            left: number
        },
        marginUnit: string,
        padding: {
            top: number,
            right: number,
            bottom: number,
            left: number
        },
        paddingUnit: string
    }) {
        this.width = option.width || STYLE_DEFAULTS.WIDTH;
        this.height = option.height || STYLE_DEFAULTS.HEIGHT;
        this.widthUnit = option.widthUnit || STYLE_DEFAULTS.WIDTH_UNIT;
        this.heightUnit = option.heightUnit || STYLE_DEFAULTS.HEIGHT_UNIT;
        this.margin = option.margin || {top: STYLE_DEFAULTS.MARGIN.TOP, bottom: STYLE_DEFAULTS.MARGIN.BOTTOM, left: STYLE_DEFAULTS.MARGIN.LEFT, right: STYLE_DEFAULTS.MARGIN.RIGHT};
        this.marginUnit = option.marginUnit || STYLE_DEFAULTS.MARGIN_UNIT;
        this.padding = option.padding || {top: STYLE_DEFAULTS.PADDING.TOP, bottom: STYLE_DEFAULTS.PADDING.BOTTOM, left: STYLE_DEFAULTS.PADDING.LEFT, right: STYLE_DEFAULTS.PADDING.RIGHT};
        this.paddingUnit = option.paddingUnit || STYLE_DEFAULTS.PADDING_UNIT;
    }
}
