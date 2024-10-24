import { CSSProperties } from "react";
import { SlideType } from "../../store/PresentationType";
import styles from './Slide.module.css';
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";


type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className?: string,
    onClick: () => void,
}

function Slide({ slide, scale = 1, isSelected, className, onClick }: SlideProps) {
    const slideStyles: CSSProperties = {
        backgroundColor: slide.background,
        width: `${850 * scale}px`,
        height: `${525 * scale}px`,
        position: 'relative',
        cursor: 'pointer',
    }
    
    if (isSelected) {
        slideStyles.border = '3px solid #E0AFA0'
    }

    return (
        <div style={slideStyles} className={styles.slide + ' ' + className} onClick={onClick}>
            {slide.elements.map(element => {
                switch (element.type) {
                    case "text":
                        return <TextObject text={element} scale={scale} key={element.id}></TextObject>
                    case "image":
                        return <ImageObject image={element} scale={scale} key={element.id}></ImageObject>
                    default:
                        throw new Error("Unknown type")
                }
            })}
        </div>
    )
}

export { Slide, }