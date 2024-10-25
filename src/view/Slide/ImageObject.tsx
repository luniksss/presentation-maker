import { ImageElement } from "../../store/PresentationType";
import { CSSProperties } from "react";

type ImageProps = {
    image: ImageElement,
    scale?: number,
    isSelected: boolean,
}

function ImageObject({image, scale = 1, isSelected}: ImageProps) {
    let imageStyles:CSSProperties = {
        width: `${image.size.width * scale}px`,
        height: `${image.size.height * scale}px`,
        position: "absolute",
        top: `${image.position.y * scale}px`,
        left: `${image.position.x * scale}px`,
    }

    if (isSelected) {
        imageStyles.border = '3px solid var(--selection)'
    } else {
        imageStyles.border = '3px solid transparent'
    }

    return (
        <img style={imageStyles} key={image.id} src={image.src} alt="yours"></img>
    )
}

export { ImageObject, }