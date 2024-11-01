import { ImageElement, Position } from "../../store/PresentationType";
import { CSSProperties, useMemo, useRef, useState } from "react";
import { useDragAndDrop } from "../../store/useDragAndDrop";

type ImageProps = {
    image: ImageElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    workspaceWidth: number,
    workspaceHeight: number,
}

const ImageObject = ({ image, scale = 1, isSelected, showSelectionBorder, workspaceWidth, workspaceHeight }: ImageProps) => {
    const [position, setPosition] = useState<Position>({ x: image.position.x, y: image.position.y });
    const ref = useRef<HTMLImageElement | null>(null);
    useDragAndDrop(ref, position, setPosition, workspaceWidth, workspaceHeight);

    const imageStyles: CSSProperties = useMemo(() => ({
            width: `${image.size.width * scale}px`,
            height: `${image.size.height * scale}px`,
            position: "absolute",
            top: `${position.y * scale}px`,
            left: `${position.x * scale}px`,
            border: (isSelected && showSelectionBorder) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [image, scale, isSelected, position]);

    image.position = position;

    return (
        <img ref={ref} style={imageStyles} key={image.id} src={image.src} alt="yours" draggable="true"></img>
    );
};

export { ImageObject };