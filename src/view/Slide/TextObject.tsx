import { Position, TextElement } from "../../store/PresentationType";
import { CSSProperties, useMemo, useState, useRef, useEffect } from "react";
import { useDragAndDrop } from "../../store/useDragAndDrop";

type TextProps = {
    text: TextElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    workspaceWidth: number,
    workspaceHeight: number,
}

const TextObject = ({ text, scale = 1, isSelected, showSelectionBorder, workspaceWidth, workspaceHeight }: TextProps) => {
    const [position, setPositionState] = useState<Position>({ x: text.position.x, y: text.position.y });
    const ref = useRef<HTMLParagraphElement | null>(null);
    useDragAndDrop(ref, position, setPositionState, workspaceWidth, workspaceHeight);

    const textStyles: CSSProperties = useMemo(() => ({
        fontFamily: text.fontFamily,
        fontSize: `${text.fontSize * scale}px`,
        width: "auto",
        height: "auto",
        position: "absolute",
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        border: (isSelected && showSelectionBorder) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [text, scale, isSelected, position]);

    return (
        <p ref={ref} style={textStyles} key={text.id} draggable="true">
            {text.content}
        </p>
    );
};

export { TextObject };