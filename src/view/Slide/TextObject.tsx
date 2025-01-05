import { Position, TextElement } from "../../store/PresentationType";
import { CSSProperties, useMemo, useEffect } from "react";
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
    const { localPosition, handleMouseDown, setLocalPosition } = useDragAndDrop(text.position);

    useEffect(() => {
        setLocalPosition(text.position);
    }, [text]);

    const textStyles: CSSProperties = useMemo(() => ({
        fontFamily: text.fontFamily,
        fontSize: `${text.fontSize * scale}px`,
        width: "auto",
        height: "auto",
        position: "absolute",
        top: `${localPosition.y * scale}px`,
        left: `${localPosition.x * scale}px`,
        color: `${text.color}`,
        border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [text, scale, isSelected, borderIsShown, showSelectionBorder, localPosition]);

    return (
        <div onMouseDown={scale === 1 ? handleMouseDown : undefined}>
            <p style={textStyles} key={text.id} draggable="true">{text.content}</p>
        </div>
    );
};

export { TextObject };
