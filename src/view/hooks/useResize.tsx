import { useEffect, useRef, useState } from "react";
import { Editor } from "../../store/EditorType";
import { useAppActions } from "./useAppActions";
import { UpdateSize } from "../../store/PresentationType";

const useResize = (initialSize: { width: number; height: number }, scale: number, editor: Editor) => {
    const {setSize} = useAppActions();
    const [sizeElement, setSizeElement] = useState(initialSize);
    const [resizeType, setResizeType] = useState<UpdateSize | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (event: MouseEvent) => {
        if (resizeType && ref.current) {
            const target = ref.current.getBoundingClientRect();
            let newWidth = sizeElement.width;
            let newHeight = sizeElement.height;

            switch (resizeType) {
                case 'diagonal-right-bottom':
                    newWidth = event.clientX - target.left;
                    newHeight = event.clientY - target.top;
                    break;
                case 'diagonal-right-top':
                    newWidth = event.clientX - target.left;
                    newHeight = target.top - event.clientY + sizeElement.height;
                    break;
                case 'diagonal-left-top':
                    newWidth = target.left - event.clientX + sizeElement.width;
                    newHeight = target.top - event.clientY + sizeElement.height;
                    break;    
                case 'diagonal-left-bottom':
                    newWidth = target.left - event.clientX + sizeElement.width;
                    newHeight = event.clientY - target.top;
                    break;      
                case 'horizontal-right':
                    newWidth = event.clientX - target.left;
                    break;
                case 'horizontal-left':
                    newWidth = target.left - event.clientX + sizeElement.width;
                    break;
                case 'vertical-bottom':
                    newHeight = event.clientY - target.top;
                    break;
                case 'vertical-top':
                    newHeight = target.top - event.clientY + sizeElement.height;
                    break;
            }

            setSizeElement({
                width: Math.max(newWidth / scale, 20),
                height: Math.max(newHeight / scale, 20)
            });
        }
    };

    const handleMouseUp = () => {
        if (ref.current) {
            const target = ref.current.getBoundingClientRect();
            if (editor.selection.slideId)
                setSize(
                {
                width: Math.max((target.right - target.left) / scale, 20),
                height: Math.max((target.bottom - target.top) / scale, 20)
            })
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
        ref
    };
};

export {
    useResize,
}