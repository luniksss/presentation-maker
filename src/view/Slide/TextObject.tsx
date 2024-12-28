import { Position, TextElement } from "../../store/PresentationType";
import { CSSProperties, useMemo, useState, useRef, useEffect } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useAppActions } from "../hooks/useAppActions";
import { useAppSelector } from "../hooks/useAppSelector";

type TextProps = {
    text: TextElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    borderIsShown: boolean,
}

const TextObject = ({ text, scale = 1, isSelected, showSelectionBorder, borderIsShown }: TextProps) => {
    const editor = useAppSelector((editor => editor))
    const { setSelection } = useAppActions()

    const { localPosition, handleMouseDown, setLocalPosition } = useDragAndDrop(
        text.position,
        text.size,
        isSelected,
        () => {setSelection({slideId: editor.selection.slideId, elementId: text.id})},
        editor,
    );

    useEffect(() => {
        return(setLocalPosition(text.position))
    }, [text]);

    const textStyles: CSSProperties = useMemo(() => ({
        fontFamily: text.fontFamily,
        fontSize: `${text.fontSize * scale}px`,
        width: "auto",
        height: "auto",
        position: "absolute",
        top: `${text.position.y * scale}px`,
        left: `${text.position.x * scale}px`,
        border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [text, scale, isSelected, text.position, borderIsShown, showSelectionBorder]);
    
    return (
        <div  onMouseDown={scale === 1 ? handleMouseDown : undefined}>
            <p style={textStyles} key={text.id} draggable="true">{text.content}</p>
        </div>
    );
};

export { TextObject };