import { CSSProperties } from "react";
import { Component, SlideType } from "../../store/PresentationType";
import styles from './Slide.module.css';
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppActions } from "../hooks/useAppActions";

const SLIDE_WIDTH = 850;
const SLIDE_HEIGHT = 525;
const PLAYER_SLIDE_WIDTH = 1112;
const PLAYER_SLIDE_HEIGHT = 617;

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className?: string,
    showSelectionBorder?: boolean,
    departurePoint: string
}

function Slide({ slide, scale = 0.9, isSelected, className, showSelectionBorder, departurePoint }: SlideProps) {
    let borderIsShown = false;
    const selection = useAppSelector((editor => editor.selection))

    const { setSelection } = useAppActions()
    function onObjectClick(object: Component): void {
        object.isSelected = true;
        setSelection({
            slideId: selection.slideId,
            elementId: object.id
        })
    }

    let slideStyles: CSSProperties = {
        backgroundColor: typeof slide.background === 'string' && slide.background.startsWith('#') ? slide.background : undefined,
        backgroundImage: typeof slide.background === 'string' && slide.background.startsWith('linear-gradient') ? slide.background :
            (typeof slide.background === 'string' && !slide.background.startsWith('#') ? `url(${slide.background})` : undefined),
        backgroundSize: 'cover',
        position: 'relative',
        width: `${PLAYER_SLIDE_WIDTH * scale}px`,
        height: `${PLAYER_SLIDE_HEIGHT * scale}px`,
        cursor: 'unset',
    }

    if (className !== "playingSlide") {
        slideStyles = {
            ...slideStyles,
            width: `${SLIDE_WIDTH * scale}px`,
            height: `${SLIDE_HEIGHT * scale}px`,
        };
    }


    if (isSelected) {
        slideStyles.border = '3px solid var(--selection)'
    } else if (className === "playingSlide") {
        slideStyles.border = 'none'
    }
    else {
        slideStyles.border = '3px solid var(--element-hover)'
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
                                    isSelected={element.id === selection.elementId}
                                    showSelectionBorder={showSelectionBorder}
                                    borderIsShown={borderIsShown}
                                />
                            </div>
                        );
                    case "image":
                        return (
                            <div onClick={() => onObjectClick(element)} key={element.id}>
                                <ImageObject
                                    image={element}
                                    scale={scale}
                                    isSelected={element.id === selection.elementId}
                                    showSelectionBorder={showSelectionBorder}
                                    borderIsShown={borderIsShown}
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