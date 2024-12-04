import { Position, TextElement } from "../../store/PresentationType";
import { CSSProperties, useMemo, useState, useRef } from "react";
import { useDragAndDrop } from "../../store/useDragAndDrop";

type TextProps = {
    text: TextElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    borderIsShown: boolean,
    departurePoint: string
}

const TextObject = ({ text, scale = 1, isSelected, showSelectionBorder, borderIsShown, departurePoint }: TextProps) => {
    const [localPosition, setLocalPosition] = useState<Position>({ x: text.position.x, y: text.position.y });
    const ref = useRef<HTMLParagraphElement | null>(null);

    useDragAndDrop(ref, setLocalPosition);
    text.position = departurePoint === "WorkSpace" ? localPosition : { x: text.position.x, y: text.position.y };

    const textStyles: CSSProperties = useMemo(() => ({
        fontFamily: text.fontFamily,
        fontSize: `${text.fontSize * scale}px`,
        width: "auto",
        height: "auto",
        position: "absolute",
        top: `${text.position.y * scale}px`,
        left: `${text.position.x * scale}px`,
        border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
        resize: "none"
    }), [text, scale, isSelected, borderIsShown, showSelectionBorder]);
    
    return (
        <p ref={ref} style={textStyles} key={text.id} draggable="true">{text.content}</p> //TODO тег textarea, изменять блок, а не тег
    );
};

export { TextObject };