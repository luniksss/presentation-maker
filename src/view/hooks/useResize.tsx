import { useEffect, useRef, useState } from "react";
import { useAppActions } from "./useAppActions";
import { Position, Size, UpdateSize } from "../../store/PresentationType";
import { useAppSelector } from "./useAppSelector";

const useResize = (
    initialSize: Size,
    initialPosition: Position,
    scale: number
) => {
    const selectedSlideId = useAppSelector((editor) => editor.selection.slideId);
    const { setSize, setPosition } = useAppActions();
    const [sizeElement, setSizeElement] = useState(initialSize);
    // const [localPosition, setLocalPosition] = useState(initialPosition);
    const [resizeType, setResizeType] = useState<UpdateSize | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (event: MouseEvent) => {
        if (resizeType && ref.current) {
            const currentElement = ref.current.getBoundingClientRect();
            let newWidth = sizeElement.width;
            let newHeight = sizeElement.height;
            // let newTopX = localPosition.x;
            // let newTopY = localPosition.y;

            switch (resizeType) {
                case 'diagonal-right-bottom':
                    newWidth = event.clientX - currentElement.left;
                    newHeight = event.clientY - currentElement.top;
                    break;
                case 'diagonal-right-top':
                    newWidth = event.clientX - currentElement.left;
                    newHeight = currentElement.bottom - event.clientY; 
                    // newTopY += currentElement.bottom - event.clientY; // Изменение позиции по Y
                    break;
                case 'diagonal-left-top':
                    newWidth = currentElement.left - event.clientX + sizeElement.width;
                    newHeight = currentElement.top - event.clientY + sizeElement.height;
                    // newTopX += currentElement.left - event.clientX; // Изменение позиции по X
                    // newTopY += currentElement.top - event.clientY; // Изменение позиции по Y
                    break;    
                case 'diagonal-left-bottom':
                    newWidth = currentElement.left - event.clientX + sizeElement.width;
                    newHeight = event.clientY - currentElement.top;
                    // newTopX += currentElement.left - event.clientX; // Изменение позиции по X
                    break;      
                case 'horizontal-right':
                    newWidth = event.clientX - currentElement.left;
                    break;
                case 'horizontal-left':
                    newWidth = currentElement.left - event.clientX + sizeElement.width;
                    // newTopX += currentElement.left - event.clientX; // Изменение позиции по X
                    break;
                case 'vertical-bottom':
                    newHeight = event.clientY - currentElement.top;
                    break;
                case 'vertical-top':
                    newHeight = currentElement.bottom - event.clientY; 
                    // newTopY += currentElement.bottom - event.clientY; // Изменение позиции по Y
                    break;
            }

            // setLocalPosition({ x: newTopX, y: newTopY });
            setSizeElement({
                width: Math.max(newWidth / scale, 20),
                height: Math.max(newHeight / scale, 20)
            });
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (ref.current) {
            const currentElement = ref.current.getBoundingClientRect();
            if (selectedSlideId) {
                // setPosition({ x: localPosition.x, y: localPosition.y});
                setSize({
                    width: Math.max((currentElement.right - currentElement.left) / scale, 20),
                    height: Math.max((currentElement.bottom - currentElement.top) / scale, 20)
                });
            }
        }
        setResizeType(null);
    };

    const handleResizeMouseDown = (type: UpdateSize) => (event: React.MouseEvent) => {
        event.stopPropagation();
        setResizeType(type);
    };

    useEffect(() => {
        if (resizeType) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizeType]);

    return {
        sizeElement,
        resizeType,
        handleResizeMouseDown,
        setSizeElement,
        ref
    };
};

export { useResize };