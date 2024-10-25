import { TextElement } from "../../store/PresentationType";
import { CSSProperties } from "react";

type TextProps = {
    text: TextElement,
    scale?: number,
    isSelected: boolean,
}

function TextObject({text, scale = 1, isSelected}: TextProps) {
    const textStyles:CSSProperties = {
        fontFamily: text.fontFamily,
        fontSize: `${text.fontSize * scale}px`,
        width: `${text.size.width * scale}px`,
        height: `${text.size.height * scale}px`,
        position: "absolute",
        top: `${text.position.y * scale}px`,
        left: `${text.position.x * scale}px`,
    }

    if (isSelected) {
        textStyles.border = '3px solid var(--selection)'
    } else {
        textStyles.border = '3px solid transparent'
    }


    return (
        <p style={textStyles} key={text.id}>{text.content}</p>
    )
}

export { TextObject, }