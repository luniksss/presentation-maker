import { Slide } from "../Slide/Slide";
import styles from './Preview.module.css';
import { useAppSelector } from '../hooks/useAppSelector';
import { useTranslation } from 'react-i18next';

const SLIDE_PREVIEW_SCALE = 0.7;

function Preview() {
    const { t } = useTranslation();
    const presentation = useAppSelector(editor => editor.presentation);
    const selection = useAppSelector(editor => editor.selection);
    const slides = presentation.slides;

    return (
        <div className={styles.slideContainer}>
            <div className={styles.slideList}>
                {slides.length === 0 ? (
                    <p>{t('emptySlideList')}</p>
                ) : (
                    slides.map((slide, index) => (
                        <ul
                            key={slide.id}
                            id={slide.id}
                        >
                            <Slide
                                slide={slide}
                                scale={SLIDE_PREVIEW_SCALE}
                                isSelected={slide.id === selection.slideIds?.[0]}
                                className={styles.slideListItem}
                                showSelectionBorder={false}
                                departurePoint={"SlideList"}
                            />
                        </ul>
                    ))
                )}
            </div>
        </div>
    );
}

export { Preview };
