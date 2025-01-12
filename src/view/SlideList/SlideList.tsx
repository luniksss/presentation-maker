import React, { useRef } from "react";
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