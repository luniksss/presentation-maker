import React, { useRef, useEffect, useState } from "react"
import { Slide } from "../Slide/Slide"
import styles from './SlideList.module.css'
import { useAppActions } from '../hooks/useAppActions'
import { useAppSelector } from '../hooks/useAppSelector'
import useSlideDragAndDrop from '../hooks/useSlideDragAndDrop'
import { useTranslation } from 'react-i18next'
import { ARROW_DOWN_KEY, ARROW_UP_KEY, DEFAULT_SCALE, DELETE, ENTER, KEYDOWN_KEY, MIN_WIDTH_SCALE, RESIZE_SCALE, SLIDE_PREVIEW_SCALE, SLIDELIST } from "../../consts"
import { calculateSlideListScale } from "../../utils/scaleCount"

const SlideList = () => {
    const { t } = useTranslation()
    const presentation = useAppSelector(editor => editor.presentation)
    const selection = useAppSelector(editor => editor.selection)
    const slides = presentation.slides
    const slideIdSet = new Set(selection.slideIds || [])
    const [scale, setScale] = useState(calculateSlideListScale())

    const { setSelection, setSlidesOrder, addSlide, removeSlide } = useAppActions()
    const slideListRef = useRef<HTMLDivElement | null>(null)
    const slideRefs = useRef<(HTMLUListElement | null)[]>([])

    const { onMouseDown, onMouseMove, onMouseUp, draggedSlideIds, dragOverIndex, isDragging } = useSlideDragAndDrop(selection, slides, (newSlides) => {
        setSlidesOrder(newSlides)
    })

    useEffect(() => {
        const handleResize = () => {
            setScale(calculateSlideListScale())
        }

        window.addEventListener(RESIZE_SCALE, handleResize)
        return () => {
            window.removeEventListener(RESIZE_SCALE, handleResize)
        }
    }, [])

    function smoothToSelection(slideId: string) {
        const index = slides.findIndex(slide => slide.id === slideId)
        if (index !== -1 && slideRefs.current[index]) {
            slideRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    function onSlideClick(slideId: string, event: React.MouseEvent<HTMLUListElement>) {
        const isCtrlPressed = event.ctrlKey || event.metaKey

        if (isCtrlPressed) {
            if (selection.slideIds?.includes(slideId)) {
                setSelection({
                    slideIds: selection.slideIds.filter(id => id !== slideId),
                    elementId: null
                })
            } else {
                setSelection({
                    slideIds: [...(selection.slideIds || []), slideId],
                    elementId: null
                })
            }
        } else {
            setSelection({
                slideIds: [slideId],
                elementId: null
            });
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (selection.slideIds !== null && selection.slideIds.length > 0) {
            const currentIndex = slides.findIndex(slide => slide.id === selection.slideIds?.[0])
            switch (event.key) {
                case ARROW_DOWN_KEY:
                    event.preventDefault()
                    if (currentIndex < slides.length - DEFAULT_SCALE) {
                        const nextSlideId = slides[currentIndex + DEFAULT_SCALE].id
                        setSelection({ slideIds: [nextSlideId], elementId: null })
                    }
                    break
                case ARROW_UP_KEY:
                    event.preventDefault()
                    if (currentIndex > 0) {
                        const prevSlideId = slides[currentIndex - DEFAULT_SCALE].id
                        setSelection({ slideIds: [prevSlideId], elementId: null })
                    }
                    break
                case ENTER:
                    addSlide()
                    break
                case DELETE:
                    removeSlide()
                    break
            }
        }
    }

    useEffect(() => {
        if (selection.slideIds !== null && selection.slideIds.length > 0) {
            smoothToSelection(selection.slideIds[0])
        }
    }, [selection.slideIds])

    useEffect(() => {
        window.addEventListener(KEYDOWN_KEY, handleKeyDown)
        return () => {
            window.removeEventListener(KEYDOWN_KEY, handleKeyDown)
        }
    }, [selection.slideIds])

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
                            ref={el => (slideRefs.current[index] = el)}
                            onClick={(event) => {
                                if (!isDragging) {
                                    onSlideClick(slide.id, event)
                                }
                            }}
                            onMouseDown={() => {
                                if (selection.slideIds?.includes(slide.id)) {
                                    onMouseDown(slide.id)
                                }
                            }}
                            onMouseMove={() => {
                                if (draggedSlideIds !== null && draggedSlideIds.length > 0 && selection.slideIds?.some(id => draggedSlideIds.includes(id))) {
                                    onMouseMove(index)
                                }
                            }}
                            onMouseUp={() => {
                                if (draggedSlideIds !== null && draggedSlideIds.length > 0 && selection.slideIds?.some(id => draggedSlideIds.includes(id))) {
                                    onMouseUp();
                                }
                            }}
                            style={{
                                opacity: draggedSlideIds?.includes(slide.id) ? MIN_WIDTH_SCALE : DEFAULT_SCALE,
                                border: dragOverIndex === index ? '2px dashed blue' : 'none',
                            }}
                        >
                            <Slide
                                slide={slide}
                                scale={scale}
                                isSelected={slideIdSet.has(slide.id)}
                                className={styles.slideListItem}
                                showSelectionBorder={false}
                                departurePoint={SLIDELIST}
                            />
                        </ul>
                    ))
                )}
            </div>
        </div>
    )
}

export { SlideList }