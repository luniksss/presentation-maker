import { ImageElement, Position } from "../../store/PresentationType";
import { CSSProperties, useMemo, useRef, useState } from "react";
import { useDragAndDrop } from "../../store/useDragAndDrop";

type ImageProps = {
    image: ImageElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    borderIsShown: boolean,
    departurePoint: string
}

const ImageObject = ({ image, scale = 1, isSelected, showSelectionBorder, borderIsShown, departurePoint }: ImageProps) => {
    const [localPosition, setLocalPosition] = useState<Position>({ x: image.position.x, y: image.position.y });
    const ref = useRef<HTMLImageElement | null>(null);

    useDragAndDrop(ref, setLocalPosition);
    image.position = departurePoint === "WorkSpace" ? localPosition : { x: image.position.x, y: image.position.y };

    const imageStyles: CSSProperties = useMemo(() => ({
            width: `${image.size.width * scale}px`,
            height: `${image.size.height * scale}px`,
            position: "absolute",
            top: `${image.position.y * scale}px`,
            left: `${image.position.x * scale}px`,
            border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [image, scale, isSelected, image.position]);

    return (
        <img ref={ref} style={imageStyles} key={image.id} src={image.src} alt="yours" draggable="true"></img>
    );
};

export { ImageObject };