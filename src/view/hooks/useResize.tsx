import { RefObject, useEffect } from "react";

export function useResize(
    resizeRef: RefObject<HTMLDivElement | null>,
    ref: RefObject<HTMLImageElement | null>,
    direction: string,
    onResize: (width: number, height: number, top: number, left: number) => void
) {
    let isResized = false;
    useEffect(() => {
        const element = ref.current;
        const resizePoint = resizeRef.current;
        if (!element || !resizePoint) return;

        const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            const startX = event.clientX;
            const startY = event.clientY;
            isResized = true;

            const { width, height } = element.getBoundingClientRect();

            const handleMouseMove = (moveEvent: MouseEvent) => {
                if (isResized) {
                    const dx = moveEvent.clientX - startX;
                    const dy = moveEvent.clientY - startY;
                    let newWidth = width;
                    let newHeight = height;
                    let newTop = startX;
                    let newLeft = startY;
                    switch (direction) {
                        case 'bottom-right':
                            newWidth += dx;
                            newHeight += dy;
                            break;
                        case 'top-left':
                            newWidth -= dx;
                            newHeight -= dy;
                            newTop += dy;
                            newLeft += dx;
                            break;
                        case 'top-right':
                            newWidth += dx;
                            newHeight -= dy;
                            newTop = moveEvent.clientX;
                            newLeft = moveEvent.clientY;
                            break;
                        case 'bottom-left':
                            newWidth += dx;
                            newHeight += dy;
                            newTop -= dx;
                            break;
                        case 'top':
                            newTop += dy;
                            newHeight -= dy;
                            break;
                        case 'right':
                            newWidth += dx;
                            break;
                        case 'bottom':
                            newHeight += dy;
                            break;
                        case 'left':
                            newWidth += dx;
                            newHeight += dy;
                            newTop -= dx;
                            break;
                        default:
                            break;
                    }

                    onResize(newWidth, newHeight, newTop, newLeft);
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

        resizePoint.addEventListener('mousedown', handleMouseDown);

        return () => {
            resizePoint.removeEventListener('mousedown', handleMouseDown);
        };
    }, [resizeRef, ref, direction, onResize]);
}