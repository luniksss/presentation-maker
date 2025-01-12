import React, { useRef, useEffect } from "react";
import { Slide } from "../Slide/Slide";
import styles from './SlideList.module.css';
import { useAppActions } from '../hooks/useAppActions';
import { useAppSelector } from '../hooks/useAppSelector';
import useSlideDragAndDrop from '../hooks/useSlideDragAndDrop';
import { useTranslation } from 'react-i18next';

const SLIDE_PREVIEW_SCALE = 0.2;

function SlideList() {
    const { t } = useTranslation();
    const presentation = useAppSelector(editor => editor.presentation);
    const selection = useAppSelector(editor => editor.selection);
    const slides = presentation.slides;
    const slideIdSet = new Set(selection.slideIds || []);

    const { setSelection, setSlidesOrder } = useAppActions();
    const slideListRef = useRef<HTMLDivElement | null>(null);

    const { onMouseDown, onMouseMove, onMouseUp, draggedSlideIds, dragOverIndex, isDragging } = useSlideDragAndDrop(selection, slides, (newSlides) => {
        setSlidesOrder(newSlides);
    });

    function onSlideClick(slideId: string): void {
        if (selection.slideIds?.includes(slideId)) {
            setSelection({
                slideIds: selection.slideIds.filter(id => id !== slideId),
                elementId: null
            });
        } else {
            setSelection({
                slideIds: [...(selection.slideIds || []), slideId],
                elementId: null
            });
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (selection.slideIds !== null && selection.slideIds.length > 0) {
            const currentIndex = slides.findIndex(slide => slide.id === selection.slideIds?.[0]);
            if (event.key === "ArrowDown") {
                if (currentIndex < slides.length - 1) {
                    const nextSlideId = slides[currentIndex + 1].id;
                    setSelection({ slideIds: [nextSlideId], elementId: null });
                }
                event.preventDefault();
            } else if (event.key === "ArrowUp") {
                if (currentIndex > 0) {
                    const prevSlideId = slides[currentIndex - 1].id;
                    setSelection({ slideIds: [prevSlideId], elementId: null });
                }
                event.preventDefault();
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selection.slideIds]);

    return (
        <div className={styles.slideContainer} ref={slideListRef}>
            <div className={styles.slideList}>
                {slides.length === 0 ? (
                    <p>{t('emptySlideList')}</p>
                ) : (
                    slides.map((slide, index) => (
                        <ul
                            key={slide.id}
                            id={slide.id}
                            onClick={() => {
                                if (!isDragging) {
                                    onSlideClick(slide.id);
                                }
                            }}
                            onMouseDown={() => {
                                if (selection.slideIds?.includes(slide.id)) {
                                    onMouseDown(slide.id);
                                }
                            }}
                            onMouseMove={() => {
                                if (draggedSlideIds !== null && draggedSlideIds.length > 0 && selection.slideIds?.some(id => draggedSlideIds.includes(id))) {
                                    onMouseMove(index);
                                }
                            }}
                            onMouseUp={() => {
                                if (draggedSlideIds !== null && draggedSlideIds.length > 0 && selection.slideIds?.some(id => draggedSlideIds.includes(id))) {
                                    onMouseUp();
                                }
                            }}                            
                            style={{
                                opacity: draggedSlideIds?.includes(slide.id) ? 0.5 : 1,
                                border: dragOverIndex === index ? '2px dashed blue' : 'none',
                            }}
                        >
                            <Slide
                                slide={slide}
                                scale={SLIDE_PREVIEW_SCALE}
                                isSelected={slideIdSet.has(slide.id)}
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

export { SlideList };