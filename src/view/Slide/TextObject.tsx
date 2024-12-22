import { Position, TextElement } from "../../store/PresentationType";
import { CSSProperties, useMemo, useState, useRef } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useAppActions } from "../hooks/useAppActions";

type TextProps = {
    text: TextElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    borderIsShown: boolean,
}

const TextObject = ({ text, scale = 1, isSelected, showSelectionBorder, borderIsShown }: TextProps) => {
    const [localPosition, setLocalPosition] = useState<Position>({ x: text.position.x, y: text.position.y });
    const ref = useRef<HTMLParagraphElement | null>(null);
    const { setPosition } = useAppActions()

    useDragAndDrop(ref, setLocalPosition, (newPos) => setPosition(newPos));

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
        <p ref={ref} style={textStyles} key={text.id} draggable="true">{text.content}</p> //TODO тег textarea, изменять блок, а не тег
    );
};

export { TextObject };