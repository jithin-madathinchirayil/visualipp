import { ButtonGroupItem, LayoutColumn } from "@core/types/app.types"

export const APP_DEFAULTS = {
    APP_NAME: "Code-x-ui",
    APP_ICON_TYPE: "string",
    APP_ICON:"<visual-i++>",
    APP_ICON_COLOR:"#4A628A",
}

export const COMP_TABS: ButtonGroupItem[] = [
    {label:'Layout',value:'layout',icon:'<i class="fi fi-rr-layout-fluid flex"></i>'},
    {label:'Component',value:'component',icon:'<i class="fi fi-rr-flux-capacitor flex"></i>'},
]

export const LAYOUT_ITEMS: LayoutColumn[] = [
    {name: "Basics",type:'layout',items:[
        {name:"1 Column",type: 'column', value:1,content:{
            type:'column',
            name:'column',
            uid:'0',
            child:[]
        }},
        {name:"2 Column",type: 'column', value:2,content:{
            type:'column',
            name:'column',
            uid:'1',
            child:[]
        }},
        {name:"3 Column",type: 'column', value:3},
        {name:"4 Column",type: 'column', value:4},
        {name:"Text",type: 'text',icon: '<i class="fi fi-rr-text"></i>'},
        {name:"Button",type: 'button',icon: '<i class="fi fi-rr-subscription-alt"></i>'},
        {name:"Image",type: 'image',icon: '<i class="fi fi-rr-picture"></i>'},
        {name:"Link",type: 'link',icon: '<i class="fi fi-rr-link-alt"></i>'},
        {name:"Input",type: 'input',icon: '<i class="fi fi-rr-input-pipe"></i>'}
    ]}
]

export const STYLE_DEFAULTS = {
    WIDTH: 100,
    HEIGHT: 100,
    WIDTH_UNIT: 'px',
    HEIGHT_UNIT: 'px',
    MARGIN: {
        TOP: 0,
        BOTTOM: 0,
        LEFT: 0,
        RIGHT: 0
    },
    MARGIN_UNIT: 'px',
    PADDING: {
        TOP: 0,
        BOTTOM: 0,
        LEFT: 0,
        RIGHT: 0
    },
    PADDING_UNIT: 'px',
    BORDER: {
        TOP: 0,
        BOTTOM: 0,
        LEFT: 0,
        RIGHT: 0
    },
    BORDER_UNIT: 'px',
    BORDER_RADIUS: {
        TOP_LEFT: 0,
        TOP_RIGHT: 0,
        BOTTOM_LEFT: 0,
        BOTTOM_RIGHT: 0
    },
    BORDER_RADIUS_UNIT: 'px',
    BACKGROUND: {
        COLOR: '#ffffff',
        IMAGE: '',
        SIZE: 'cover',
        POSITION: 'center',
        REPEAT: 'no-repeat'
    },
    FONT: {
        SIZE: 16,
        SIZE_UNIT: 'px',
        WEIGHT: 'normal',
        FAMILY: 'Roboto',
        STYLE: 'normal',
        COLOR: '#000000',
        LINE_HEIGHT: 1.5,
        LETTER_SPACING: 0,
        TEXT_TRANSFORM: 'none',
        TEXT_DECORATION: 'none',
        TEXT_SHADOW: 'none',
        TEXT_ALIGN: 'left',
        TEXT_ALIGN_LAST: 'auto',
        TEXT_JUSTIFY: 'auto',
        TEXT_OVERFLOW: 'clip',
        TEXT_OVERFLOW_ELLIPSIS: 'ellipsis',
        TEXT_OVERFLOW_WRAP: 'wrap',
        TEXT_OVERFLOW_BREAK_WORD: 'normal',
        TEXT_OVERFLOW_BREAK_ALL: 'break-all',
    }
}