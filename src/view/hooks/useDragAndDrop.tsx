import { useEffect, useState } from "react";
import { Position } from "../../store/PresentationType";
import { useAppActions } from "./useAppActions";
import { Selection } from "../../store/EditorType";

const useDragAndDrop = (
    initialPosition: Position,
    elementId: string,
    selection: Selection,
    isSelected: boolean,
) => {
    const {setPosition, setSelection} = useAppActions()
    const [localPosition, setLocalPosition] = useState({...initialPosition});
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x: 0, y: 0});

    const handleMouseMove = (e: MouseEvent) => {
        if(isDragging){
            const newX = localPosition.x + (e.clientX - dragStart.x);
            const newY = localPosition.y + (e.clientY - dragStart.y);
            setLocalPosition({x: newX, y: newY})
        }
    }

    const handleMouseUp = (e: MouseEvent) => {
        if(isDragging){
            const newX = localPosition.x + (e.clientX - dragStart.x);
            const newY = localPosition.y + (e.clientY - dragStart.y);
            setPosition({ x: newX, y: newY });
            setIsDragging(false);
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        if (!isSelected) {
            const firstSelectedSlideId = selection.slideIds && selection.slideIds.length > 0 ? selection.slideIds[0] : null;
            if (firstSelectedSlideId !== null) {
                setSelection({slideIds: [firstSelectedSlideId], elementId: elementId})
            }
        }
        setDragStart({x: e.clientX, y: e.clientY})
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return { localPosition, handleMouseDown, setLocalPosition };
};

export {
    useDragAndDrop,
}