import { MutableRefObject, useEffect } from "react";
import { Position } from "../../store/PresentationType";

function useDragAndDrop(
    ref: MutableRefObject<HTMLElement | null>,
    setPosition: (position: Position | ((prevPosition: Position) => Position)) => void) {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            let startX = event.clientX;
            let startY = event.clientY;

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;

                setPosition((prevPosition) => ({
                    x: prevPosition.x + dx,
                    y: prevPosition.y + dy,
                }));

                startX = moveEvent.clientX;
                startY = moveEvent.clientY;
            };

            const handleMouseUp = () => {
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
    }, [ref, setPosition]);
}

export {useDragAndDrop}