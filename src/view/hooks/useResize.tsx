import { useEffect, useRef, useState } from "react";
import { useAppActions } from "./useAppActions";
import { Size, UpdateSize } from "../../store/PresentationType";
import { useAppSelector } from "./useAppSelector";

const useResize = (
    initialSize: Size,
    scale: number
) => {
    const selectedSlideId = useAppSelector((editor) => editor.selection.slideId);
    const { setSize } = useAppActions();
    const [sizeElement, setSizeElement] = useState(initialSize);
    const [resizeType, setResizeType] = useState<UpdateSize | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (event: MouseEvent) => {
        if (resizeType && ref.current) {
            const currentElement = ref.current.getBoundingClientRect();
            let newWidth = sizeElement.width;
            let newHeight = sizeElement.height;

            switch (resizeType) {
                case 'diagonal-right-bottom':
                    newWidth = event.clientX - currentElement.left;
                    newHeight = event.clientY - currentElement.top;
                    break;    
                case 'horizontal-right':
                    newWidth = event.clientX - currentElement.left;
                    break;
                case 'vertical-bottom':
                    newHeight = event.clientY - currentElement.top;
                    break;
            }

            setSizeElement({
                width: Math.max(newWidth / scale, 50),
                height: Math.max(newHeight / scale, 50)
            });
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (ref.current) {
            const currentElement = ref.current.getBoundingClientRect();
            if (selectedSlideId) {
                setSize({
                    width: Math.max((currentElement.right - currentElement.left) / scale, 50),
                    height: Math.max((currentElement.bottom - currentElement.top) / scale, 50)
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