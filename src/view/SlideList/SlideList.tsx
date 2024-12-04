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

function SlideList({ slides, selection }: SlideListProps) {
    function onSlideClick(slideId: string): void {
        dispatch(setSelection, { slideId: slideId, elementId: null })
    }

    return (
        <div className={styles.slideContainer}>
            <div className={styles.slideList}>
                {slides.length === 0 ? (
                    <p>Нет доступных слайдов</p>
                ) : (
                    slides.map(slide => (
                        <ul onClick={() => onSlideClick(slide.id)} key={slide.id}>
                            <Slide
                                slide={slide}
                                scale={0.2}
                                isSelected={slide.id === selection.slideId}
                                className={styles.slideListItem}
                                selectedObjId={selection.elementId}
                                showSelectionBorder={false}
                                departurePoint={"SlideList"}
                            />
                        </ul>
                    ))
                )}
            </div>
        </div>
    )
}

export { SlideList }