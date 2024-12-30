import { useState, useCallback } from 'react';
import { SlideType } from '../../store/PresentationType';

function useSlideDragAndDrop(slides: SlideType[], setSlides: (slides: any[]) => void) {
    const [draggedSlideId, setDraggedSlideId] = useState<string | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const onMouseDown = useCallback((id: string) => {
        setDraggedSlideId(id);
    }, []);

    const onMouseMove = useCallback((index: number) => {
        if (draggedSlideId) {
            setDragOverIndex(index);
        }
    }, [draggedSlideId]);

    const onMouseUp = useCallback(() => {
        if (draggedSlideId !== null && dragOverIndex !== null) {
            const newSlides = [...slides];
            const draggedSlideIndex = slides.findIndex(slide => slide.id === draggedSlideId);

            const [removed] = newSlides.splice(draggedSlideIndex, 1);
            newSlides.splice(dragOverIndex, 0, removed);

            setSlides(newSlides);
        }
        setDraggedSlideId(null);
        setDragOverIndex(null);
    }, [draggedSlideId, dragOverIndex, slides, setSlides]);

    return {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        draggedSlideId,
        dragOverIndex,
    };
}

export default useSlideDragAndDrop;
