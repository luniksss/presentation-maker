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
                {slides.map(slide =>
                    <div onClick={() => onSlideClick(slide.id)} key={slide.id}>
                        <ul>
                            <Slide
                                slide={slide}
                                scale={0.2}
                                isSelected={slide.id === selection.slideId}
                                className={styles.slideListItem}
                                selectedObjId={selection.elementId}
                                showSelectionBorder={false}
                                departurePoint= {"SlideList"}
                            ></Slide>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export { SlideList }