import { Slide } from "../Slide/Slide";
import styles from './SlideList.module.css'
import { useAppActions } from '../hooks/useAppActions';
import { useAppSelector } from '../hooks/useAppSelector';
import React, { useRef } from "react";

const SLIDE_PREVIEW_SCALE = 0.2

function SlideList() {
    const presentation = useAppSelector((editor => editor.presentation))
    const selection = useAppSelector((editor => editor.selection))
    const slides = presentation.slides

    const {setSelection} = useAppActions();
    const slideListRef = useRef<HTMLDivElement | null>(null);
    
    function onSlideClick(slideId: string): void {
        setSelection({
            slideId: slideId,
            elementId: null
        })
    }

    const scrollToSelectedSlide = (slideId: string) => {
        const slideElement = document.getElementById(slideId);
        if (slideElement && slideListRef.current) {
            slideElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    React.useEffect(() => {
        if (selection && selection.slideId) {
            scrollToSelectedSlide(selection.slideId);
        }
    }, [selection]);

    return (
        <div className={styles.slideContainer} ref={slideListRef}>
            <div className={styles.slideList}>
                {slides.length === 0 ? (
                    <p>Нет доступных слайдов</p>
                ) : (
                    slides.map(slide => (
                        <ul onClick={() => onSlideClick(slide.id)} key={slide.id} id={slide.id}> {/* Добавляем id для прокрутки */}
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

export { SlideList }