import { TextElement } from "../../store/PresentationType";
import { CSSProperties } from "react";

type TextProps = {
    text: TextElement,
    scale?: number,
}

function TextObject({text, scale = 1}: TextProps) {
    const textStyles:CSSProperties = {
        fontFamily: text.fontFamily,
        fontSize: `${text.fontSize * scale}px`,
        width: `${text.size.width * scale}px`,
        height: `${text.size.height * scale}px`,
        position: "absolute",
        top: `${text.position.y * scale}px`,
        left: `${text.position.x * scale}px`,
    }
    return (
        <p style={textStyles} key={text.id}>{text.content}</p>
    )
}

export { TextObject, }