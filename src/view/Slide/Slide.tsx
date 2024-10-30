import { CSSProperties } from "react";
import { Component, SlideType } from "../../store/PresentationType";
import styles from './Slide.module.css';
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import { dispatch } from "../../store/editor";
import { setSelection } from "../../store/setSelection";

const SLIDE_WIDTH = 850;
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className?: string,
    selectedObjId: string | null,
}

function Slide({ slide, scale = 1, isSelected, className, selectedObjId }: SlideProps) {
    function onObjectClick(object: Component): void {
        if (object.isSelected === true) {
            object.isSelected = false;
            dispatch(setSelection, {slideId: slide.id, elementId: null})
        } else {
            object.isSelected = true;
            dispatch(setSelection, {slideId: slide.id, elementId: object.id})
        }
    }

    const slideStyles: CSSProperties = {
        backgroundColor: typeof slide.background === 'string' && slide.background.startsWith('#') ? slide.background : undefined,
        backgroundImage: typeof slide.background === 'string' && !slide.background.startsWith('#') ? `url(${slide.background})` : undefined,
        backgroundSize: 'cover',
        position: 'relative',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        cursor: 'pointer',
    }
    
    if (isSelected) {
        slideStyles.border = '3px solid var(--selection)'
    }

    return (
        <div style={slideStyles} className={styles.slide}>
            {slide.elements.map(element => {
                switch (element.type) {
                    case "text":
                        return (
                        <div onClick={() => onObjectClick(element)} key={element.id}>
                            <TextObject text={element} scale={scale} isSelected={element.id === selectedObjId}></TextObject>
                        </div>)
                    case "image":
                        return (
                        <div onClick={() => onObjectClick(element)} key={element.id}>
                            <ImageObject image={element} scale={scale} isSelected={element.id === selectedObjId}></ImageObject>
                        </div>)
                    default:
                        throw new Error("Unknown type")
                }
            })}
        </div>
    )
}

export { Slide }