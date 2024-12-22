import { MutableRefObject, useEffect } from "react";
import { Position } from "../../store/PresentationType";

function useDragAndDrop(
    ref: MutableRefObject<HTMLElement | null>,
    setLocalPosition: (position: Position | ((prevPosition: Position) => Position)) => void,
    setPosition: (newPosition: Position) => void) {
    
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let startX: number;
        let startY: number;
        let newPosition: Position;

        const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            startX = event.clientX;
            startY = event.clientY;

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;

                setLocalPosition((prevPosition) => {
                    newPosition = {
                        x: prevPosition.x + dx,
                        y: prevPosition.y + dy,
                    };
                    return newPosition;
                });
                startX = moveEvent.clientX;
                startY = moveEvent.clientY;
            };

            const handleMouseUp = () => {
                setPosition(newPosition);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        element.addEventListener('mousedown', handleMouseDown);

        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
        };
    }, [ref, setLocalPosition, setPosition]);
}

export {useDragAndDrop}