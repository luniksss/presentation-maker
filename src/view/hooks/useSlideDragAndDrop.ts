import { useState, useCallback } from 'react'
import { SlideType } from '../../store/PresentationType'
import { Selection } from '../../store/EditorType'

function useSlideDragAndDrop(
    selection: Selection,
    slides: SlideType[], 
    setSlides: (slides: any[]) => void) 
{
    const [draggedSlideIds, setDraggedSlideIds] = useState<string[] | null>([])
    const [isDragging, setIsDragging] = useState(false)
    let [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

    const onMouseDown = useCallback((id: string) => {
        if (selection.slideIds?.includes(id)) {
            setDraggedSlideIds(selection.slideIds)
            setIsDragging(true)
        }
    }, [selection.slideIds])
    

    const onMouseMove = useCallback((index: number) => {
        if (draggedSlideIds) {
            setDragOverIndex(index)
        }
    }, [draggedSlideIds])

    const onMouseUp = useCallback(() => {
        if (draggedSlideIds !== null && draggedSlideIds.length > 0 && dragOverIndex !== null) {
            const newSlides = [...slides]
            const filteredSlides = newSlides.filter(slide => !draggedSlideIds.includes(slide.id))

            let currentDragOverIndex = dragOverIndex
            draggedSlideIds.forEach(removed => {
                const slideToInsert = slides.find(slide => slide.id === removed)
                if (slideToInsert) {
                    filteredSlides.splice(currentDragOverIndex, 0, slideToInsert)
                    currentDragOverIndex++
                }
            });
    
            setSlides(filteredSlides)
        }
        setDraggedSlideIds([])
        setDragOverIndex(null)
        setIsDragging(false)
    }, [draggedSlideIds, dragOverIndex, slides, setSlides])

    return {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        draggedSlideIds,
        dragOverIndex,
        isDragging,
    }
}

export default useSlideDragAndDrop