type Size = {
    width: number;
    height: number;
}

type UpdateSize = 
    | 'horizontal-right' 
    | 'horizontal-left' 
    | 'diagonal-right-bottom' 
    | 'diagonal-right-top' 
    | 'diagonal-left-bottom' 
    | 'diagonal-left-top' 
    | 'vertical-top' 
    | 'vertical-bottom';

type Position = {
    x: number;
    y: number;
}

type Elem = {
    id: string;
    size: Size;
    position: Position;
    isSelected: boolean;
}

type TextElement = Elem & {
    type: 'text';
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
}

type ImageElement = Elem & {
    type: 'image',
    src: string;
}

type Component = TextElement | ImageElement;

type SlideType = {
    id: string;
    background: string;
    elements: Component[];
}

type Presentation = {
    title: string;
    slides: SlideType[];
}

export type { Presentation, SlideType, Component, TextElement, ImageElement, Position, Size, UpdateSize};