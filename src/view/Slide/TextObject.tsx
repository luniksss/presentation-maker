import { TextElement } from "../../store/PresentationType";
import { CSSProperties, useMemo, useEffect, useState } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppActions } from "../hooks/useAppActions";

type TextProps = {
    text: TextElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    borderIsShown: boolean,
}

const TextObject = ({ text, scale = 1, isSelected, showSelectionBorder, borderIsShown }: TextProps) => {
    const selection = useAppSelector((editor) => editor.selection)
    const { localPosition, handleMouseDown, setLocalPosition } = useDragAndDrop(text.position, text.id, selection, isSelected);
    const { updateTextContent } = useAppActions();

    const [isEditing, setIsEditing] = useState(false);
    const [editableText, setEditableText] = useState(text.content);

    useEffect(() => {
        setLocalPosition(text.position);
        setEditableText(text.content);
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
        <div onMouseDown={scale === 1 ? handleMouseDown : undefined} onDoubleClick={handleDoubleClick}>
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
        </div>
    );
};

export { TextObject };
