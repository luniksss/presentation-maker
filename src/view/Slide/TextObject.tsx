import { TextElement, UpdateSize } from "../../store/PresentationType";
import { CSSProperties, useMemo, useEffect, useState } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useResize } from "../hooks/useResize";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppActions } from "../hooks/useAppActions";

type TextProps = {
    text: TextElement,
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

const TextObject = ({ text, scale = 1, isSelected, showSelectionBorder, borderIsShown }: TextProps) => {
    const selection = useAppSelector((editor) => editor.selection)
    const { localPosition, handleMouseDown, setLocalPosition } = useDragAndDrop(text.position, text.id, selection, isSelected);
    const { sizeElement, resizePosition, handleResizeMouseDown, setSizeElement, setResizePosition, ref } = useResize(text.size, localPosition);
    const { updateTextContent } = useAppActions();

    const [isEditing, setIsEditing] = useState(false);
    const [editableText, setEditableText] = useState(text.content);

    useEffect(() => {
        setLocalPosition(resizePosition);
    }, [resizePosition]);

    useEffect(() => {
        setLocalPosition(text.position);
        setSizeElement(text.size)
        setEditableText(text.content);
    }, [text]);

    const resizeHandles: ResizeHandle[] = [
        { type: 'diagonal-right-bottom', style: { bottom: 0, right: 0, cursor: 'nwse-resize' } },
        { type: 'horizontal-right', style: { bottom: '50%', right: 0, cursor: 'ew-resize' } },
        { type: 'vertical-bottom', style: { bottom: 0, right: '50%', cursor: 'ns-resize' } },
        { type: 'diagonal-left-top', style: { top: 0, left: 0, cursor: 'nwse-resize'} },
        { type: 'vertical-top', style: { top: 0, left: '50%', cursor: 'ns-resize'} },
        { type: 'diagonal-right-top', style: { top: 0, right: 0, cursor: 'nwse-resize' } },
        { type: 'horizontal-left', style: { bottom: '50%', left: 0, cursor: 'ew-resize' } },
        { type: 'diagonal-left-bottom', style: { bottom: 0, left: 0, cursor: 'nwse-resize' } },
    ];

    const textBlockStyles: CSSProperties = useMemo(() => ({
        width: `${sizeElement.width * scale}px`,
        height: `${sizeElement.height * scale}px`,
        position: "relative",
        top: `${localPosition.y * scale}px`,
        left: `${localPosition.x * scale}px`,
    }), [scale, localPosition, sizeElement])

    const textStyles: CSSProperties = useMemo(() => ({
        fontFamily: text.fontFamily,
        fontSize: `${text.fontSize * scale}px`,
        width: `${sizeElement.width * scale}px`,
        height: `${sizeElement.height * scale}px`,
        position: "absolute",
        color: `${text.color}`,
        border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [text, scale, isSelected, borderIsShown, showSelectionBorder, sizeElement]);

    const resizeHandleStyles: CSSProperties = {
        width: "10px",
        height: "10px",
        backgroundColor: "var(--resize-handle-color, #000)",
        position: "absolute",
        borderRadius: "50%",
        cursor: "pointer",
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableText(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        updateTextContent(editableText);
    };
    return (
        <div ref={ref} onMouseDown={scale === 1 ? handleMouseDown : undefined} style={textBlockStyles} onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <input
                    value={editableText}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    autoFocus
                    style={{ ...textStyles, outline: "none", border: 'none', backgroundColor: 'transparent' }}
                />
            ) : (
                <p style={textStyles} key={text.id} draggable="true">{text.content}</p>
            )}
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

export { TextObject };
