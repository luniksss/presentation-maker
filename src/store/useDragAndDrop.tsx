import { MutableRefObject, useEffect } from "react";
import { Position } from "./PresentationType";

function useDragAndDrop(
    ref: MutableRefObject<HTMLElement | null>,
    position: Position,
    setPosition: (position: Position | ((prevPosition: Position) => Position)) => void,
    workspaceWidth: number,
    workspaceHeight: number
) {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            const startX = event.clientX;
            const startY = event.clientY;

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;

                const newPosition = {
                    x: position.x + dx,
                    y: position.y + dy,
                };

                const constrainedX = Math.min(
                    Math.max(newPosition.x, 0), // Prevent moving left
                    workspaceWidth - element.offsetWidth // Prevent moving right
                );

                const constrainedY = Math.min(
                    Math.max(newPosition.y, 0), // Prevent moving up
                    workspaceHeight - element.offsetHeight // Prevent moving down
                );

                setPosition({ x: constrainedX, y: constrainedY });
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
    }, [ref, setPosition, position, workspaceWidth, workspaceHeight]);
}

export { useDragAndDrop };