import { SlideType } from "../../store/PresentationType"
import { Slide } from "../Slide/Slide"
import styles from "./WorkSpace.module.css"
import { useAppSelector } from '../hooks/useAppSelector';

function WorkSpace() {
    const presentation = useAppSelector((editor => editor.presentation))
    const selection = useAppSelector((editor => editor.selection))
    const slides = presentation.slides
    const slide: SlideType = slides.find(slide => slide.id === selection?.slideIds?.[0]) || slides[0]

    return (
        <div className={styles.workSpace}>
            {slide ? (
                <Slide
                    slide={slide}
                    scale={1}
                    isSelected={true}
                    showSelectionBorder={true}
                    departurePoint={"WorkSpace"}
                />
            ) : (
                <p>Создайте и выберите слайд</p>
            )}
        </div>
    );
}

export { WorkSpace }