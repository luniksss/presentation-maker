import { RefObject, useEffect } from "react";

export function useResize(
    ref: RefObject<HTMLDivElement | null>,
    direction: string,
    onResize: (width: number, height: number, top: number, left: number) => void
) {
    let isResized = false;
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            const startX = event.clientX;
            const startY = event.clientY;
            isResized = true;

            const { top, left, width, height } = element.getBoundingClientRect();
            const initialTop = element.offsetTop;
            const initialLeft = element.offsetLeft;

            const handleMouseMove = (moveEvent: MouseEvent) => {
                if (isResized) {
                    let newWidth = width;
                    let newHeight = height;
                    let dx, dy;
                    switch (direction) {
                        case 'bottom-right':
                            dx = moveEvent.clientX - startX - left ;
                            dy = moveEvent.clientY - startY;
                            newWidth = startX + dx;
                            newHeight = startY + dy;
                            break;
                        case 'top':
                            break;
                        default:
                            break;
                    }

                    onResize(newWidth, newHeight, initialTop, initialLeft);
                }
            };

            const handleMouseUp = () => {
                isResized = false;
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
    }, [ref, onResize]);
}