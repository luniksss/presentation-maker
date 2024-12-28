import { ImageElement, UpdateSize } from "../../store/PresentationType";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useResize } from "../hooks/useResize";
import { useAppActions } from "../hooks/useAppActions";
import { useAppSelector } from "../hooks/useAppSelector";

type ImageProps = {
    image: ImageElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    borderIsShown: boolean,
}

type ResizeHandle = {
    type: UpdateSize;
    style: {
        bottom?: number | string;
        right?: number | string;
        top?: number | string;
        left?: number | string;
        cursor: string;
    };
}

const ImageObject = ({ image, scale = 1, isSelected, showSelectionBorder, borderIsShown }: ImageProps) => {
    const { setSelection } = useAppActions()
    const editor = useAppSelector((editor => editor))

    const { localPosition, handleMouseDown, setLocalPosition } = useDragAndDrop(
        image.position,
        image.size,
        isSelected,
        () => { setSelection({ slideId: editor.selection.slideId, elementId: image.id }) },
        editor,
    );

    useEffect(() => {
        return (setLocalPosition(image.position))
    }, [image]);

    const { sizeElement, resizeType, handleResizeMouseDown, ref } = useResize(image.size, scale, editor);

    const resizeHandles: ResizeHandle[] = [
        { type: 'diagonal-right-bottom', style: { bottom: 0, right: 0, cursor: 'nwse-resize' } },
        { type: 'diagonal-right-top', style: { top: 0, right: 0, cursor: 'nesw-resize' } },
        { type: 'diagonal-left-bottom', style: { bottom: 0, left: 0, cursor: 'nesw-resize' } },
        { type: 'diagonal-left-top', style: { top: 0, left: 0, cursor: 'nwse-resize' } },
        { type: 'horizontal-right', style: { bottom: '50%', right: 0, cursor: 'ew-resize' } },
        { type: 'vertical-bottom', style: { bottom: 0, right: '50%', cursor: 'ns-resize' } },
        { type: 'vertical-top', style: { top: 0, right: '50%', cursor: 'ns-resize' } },
        { type: 'horizontal-left', style: { bottom: '50%', left: 0, cursor: 'ew-resize' } },
    ];

    const imageStyles: CSSProperties = useMemo(() => ({
        width: `${image.size.width * scale}px`,
        height: `${image.size.height * scale}px`,
        position: "absolute",
        top: `${image.position.y * scale}px`,
        left: `${image.position.x * scale}px`,
        border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [scale, isSelected, image.position, image.size, borderIsShown, showSelectionBorder]);

    const resizeHandleStyles: CSSProperties = {
        width: "10px",
        height: "10px",
        backgroundColor: "var(--resize-handle-color, #000)",
        position: "absolute",
        top: `${image.position.y * scale}px`,
        left: `${image.position.x * scale}px`,
        borderRadius: "50%",
        cursor: "pointer",
    };
    return (
        <div ref={ref} onMouseDown={scale === 1 ? handleMouseDown : undefined}>
            <img style={imageStyles} key={image.id} src={image.src} alt="yours" draggable="true"></img>
            <div>
                {isSelected && borderIsShown && resizeHandles.map(handle => {
                    const handleStyle: CSSProperties = {
                        ...resizeHandleStyles,
                        bottom: handle.style.bottom,
                        right: handle.style.right,
                        top: handle.style.top,
                        left: handle.style.left,
                    };

                    return (
                        <div
                            key={handle.type}
                            onMouseDown={handleResizeMouseDown(handle.type)}
                            style={handleStyle}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export { ImageObject };