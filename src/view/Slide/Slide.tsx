import { CSSProperties, useRef, useState } from "react";
import { Component, Position, SlideType } from "../../store/PresentationType";
import styles from './Slide.module.css';
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import { dispatch } from "../../store/editor";
import { setSelection } from "../../store/setSelection";
import { useDragAndDrop } from "../../store/useDragAndDrop";

const SLIDE_WIDTH = 850;
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className?: string,
    selectedObjId: string | null,
    showSelectionBorder?: boolean,
    departurePoint: string
}

function Slide({ slide, scale = 1, isSelected, className, selectedObjId, showSelectionBorder, departurePoint }: SlideProps) {
    let borderIsShown = false;
                
    function onObjectClick(object: Component): void {
        object.isSelected = true;
        dispatch(setSelection, {slideId: slide.id, elementId: object.id})
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
    } else {
        slideStyles.border = '3px solid transparent'
    }

    if (departurePoint === "WorkSpace") {
        borderIsShown = true;
    }

    return (
        <div style={slideStyles} className={styles.slide}>
            {slide.elements.map(element => {
                switch (element.type) {
                    case "text":
                        return (
                            <div onClick={() => onObjectClick(element)} key={element.id}>
                                <TextObject 
                                    text={element} 
                                    scale={scale} 
                                    isSelected={element.id === selectedObjId} 
                                    showSelectionBorder={showSelectionBorder} 
                                    borderIsShown = {borderIsShown}
                                    departurePoint = {departurePoint}
                                />
                            </div>
                        );
                    case "image":
                        return (
                            <div onClick={() => onObjectClick(element)} key={element.id}>
                                <ImageObject 
                                    image={element} 
                                    scale={scale} 
                                    isSelected={element.id === selectedObjId} 
                                    showSelectionBorder={showSelectionBorder} 
                                    borderIsShown = {borderIsShown}
                                    departurePoint = {departurePoint}
                                />
                            </div>
                        );
                    default:
                        throw new Error("Unknown type");
                }
            })}
        </div>
    );
}

export { Slide }