import { Slide } from "../Slide/Slide";
import styles from './Preview.module.css';
import { useAppSelector } from '../hooks/useAppSelector';

const SLIDE_PREVIEW_SCALE = 0.7;

function Preview() {
    const presentation = useAppSelector(editor => editor.presentation);
    const selection = useAppSelector(editor => editor.selection);
    const slides = presentation.slides;

    return (
        <div className={styles.slideContainer}>
            <div className={styles.slideList}>
                {slides.length === 0 ? (
                    <p>Нет доступных слайдов</p>
                ) : (
                    slides.map((slide, index) => (
                        <ul
                            key={slide.id}
                            id={slide.id}
                        >
                            <Slide
                                slide={slide}
                                scale={SLIDE_PREVIEW_SCALE}
                                isSelected={slide.id === selection.slideId}
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
