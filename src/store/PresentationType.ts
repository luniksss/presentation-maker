type Size = {
    width: number
    height: number
}

type UpdateSize =
    | 'horizontal-right'
    | 'horizontal-left'
    | 'diagonal-right-bottom'
    | 'diagonal-right-top'
    | 'diagonal-left-bottom'
    | 'diagonal-left-top'
    | 'vertical-top'
    | 'vertical-bottom'

type ResizeHandle = {
    type: UpdateSize
    style: {
        bottom?: number | string
        right?: number | string
        top?: number | string
        left?: number | string
        cursor: string
    }
}

type Position = {
    x: number
    y: number
}

type Elem = {
    id: string
    size: Size
    position: Position
    isSelected: boolean
}

type TextElement = Elem & {
    type: 'text'
    content: string
    fontSize: number
    fontFamily: string
    color: string
}

const AvailableFonts = [
    { name: 'Times New Roman' },
    { name: 'Poppins' },
    { name: 'Verdana' },
    { name: 'Montserrat' },
    { name: 'Merriweather' },
    { name: 'Open Sans' },
];

type ImageElement = Elem & {
    type: 'image'
    src: string
}

type Component = TextElement | ImageElement

type SlideType = {
    id: string
    background: string
    elements: Component[]
}

type Presentation = {
    title: string
    slides: SlideType[]
}

export type { Presentation, SlideType, Component, TextElement, ImageElement, Position, Size, UpdateSize, ResizeHandle }
export {AvailableFonts}