import { ImageElement, UpdateSize } from "../../store/PresentationType";
import { CSSProperties, useEffect, useMemo } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useResize } from "../hooks/useResize";
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
    const selection = useAppSelector((editor) => editor.selection)
    const { localPosition, handleMouseDown, setLocalPosition } = useDragAndDrop(image.position, image.id, selection, isSelected);
    const { sizeElement, resizeType, handleResizeMouseDown, setSizeElement, ref } = useResize(image.size, scale);

    useEffect(() => {
        setLocalPosition(image.position)
        setSizeElement(image.size)
    }, [image]);


    const resizeHandles: ResizeHandle[] = [
        { type: 'diagonal-right-bottom', style: { bottom: 0, right: 0, cursor: 'nwse-resize' } },
        { type: 'horizontal-right', style: { bottom: '50%', right: 0, cursor: 'ew-resize' } },
        { type: 'vertical-bottom', style: { bottom: 0, right: '50%', cursor: 'ns-resize' } },
    ];

    const imageBlockStyles: CSSProperties = useMemo(() => ({
        width: `${sizeElement.width * scale}px`,
        height: `${sizeElement.height * scale}px`,
        position: "relative",
        top: `${localPosition.y * scale}px`,
        left: `${localPosition.x * scale}px`,
    }), [scale, localPosition, sizeElement]);

    const imageStyles: CSSProperties = useMemo(() => ({
        width: `${sizeElement.width * scale}px`,
        height: `${sizeElement.height * scale}px`,
        position: "absolute",
        border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [scale, isSelected, sizeElement, borderIsShown, showSelectionBorder, localPosition]);

    const resizeHandleStyles: CSSProperties = {
        width: "10px",
        height: "10px",
        backgroundColor: "var(--resize-handle-color, #000)",
        position: "absolute",
        borderRadius: "50%",
        cursor: "pointer",
    };

    return (
        <div ref={ref} onMouseDown={scale === 1 ? handleMouseDown : undefined} style={imageBlockStyles}>
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