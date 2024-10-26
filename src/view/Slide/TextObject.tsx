import { TextElement } from "../../store/PresentationType";
import { CSSProperties, useMemo, useState, useRef } from "react";
import { useDragAndDrop } from "../../store/useDragAndDrop";

type TextProps = {
    text: TextElement,
    scale?: number,
    isSelected: boolean,
}

function TextObject({text, scale = 1, isSelected}: TextProps) {
    const textStyles:CSSProperties = useMemo(() => {
        return {
            fontFamily: text.fontFamily,
            fontSize: `${text.fontSize * scale}px`,
            width: `${text.size.width * scale}px`,
            height: `${text.size.height * scale}px`,
            position: "absolute",
            top: `${text.position.y * scale}px`,
            left: `${text.position.x * scale}px`,
            border: isSelected ? '3px solid var(--selection)' : '3px solid transparent',
        };
    }, [text, scale, isSelected]);

    const ref = useRef<HTMLParagraphElement | null>(null);
    const [position, setPosition] = useState(text.position);
    useDragAndDrop(ref, position, setPosition);

    return (
        <p ref={ref} style={textStyles} key={text.id} draggable="true">{text.content} </p>
    )
}

export { TextObject }