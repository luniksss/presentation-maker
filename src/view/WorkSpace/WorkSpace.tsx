import { SlideType } from "../../store/PresentationType"
import { Slide } from "../Slide/Slide"
import styles from "./WorkSpace.module.css"
import { useAppSelector } from '../hooks/useAppSelector';
import { useTranslation } from 'react-i18next';

function WorkSpace() {
    const { t } = useTranslation();
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
                <p>{t('workspaceSlideNotFound')}</p>
            )}
        </div>
    );
}

export { WorkSpace }