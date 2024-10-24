import { SlideType } from "../../store/PresentationType";
import { Slide } from "../Slide/Slide";
import styles from './SlideList.module.css'
import { Selection } from "../../store/EditorType";
import { dispatch } from "../../store/editor";
import { setSelection } from "../../store/setSelection";

type SlideListProps = {
    slides: Array<SlideType>,
    selection: Selection,
}

function SlideList({slides, selection}: SlideListProps) {

    function onSlideClick(slideId: number): void {
        dispatch(setSelection, {slideId: slideId})
    }

    return (
        <div className={styles.slideContainer}>
            <div className={styles.slideList}>
                {slides.map(slide => 
                    <Slide  
                    key={slide.id}
                    slide={slide}
                    scale={0.2}
                    isSelected= {slide.id === selection.slideId}
                    className={styles.slideListItem}
                    onClick={() => onSlideClick(slide.id)}
                    ></Slide>
                )}
            </div>
        </div>
    )
}

export { SlideList, }