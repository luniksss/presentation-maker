import { ImageElement, Position } from "../../store/PresentationType";
import { CSSProperties, useMemo, useRef, useState } from "react";
import { useDragAndDrop } from "../../store/useDragAndDrop";
import { useResize } from "../../store/useResize";

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
    const [resize, setResize] = useState({ width: image.size.width, height: image.size.height, top: image.position.y, left: image.position.x });
    const ref = useRef<HTMLImageElement | null>(null);
    const resizeRef = useRef<HTMLDivElement | null>(null);

    useDragAndDrop(ref, setLocalPosition);
    image.position = departurePoint === "WorkSpace" ? localPosition : { x: image.position.x, y: image.position.y };

    const handleResize = (width: number, height: number, top: number, left: number) => {
        setResize({ width, height, top, left });
    };

    let direction = 'bottom-right';
    useResize(resizeRef, direction, handleResize);
    image.size = { width: resize.width, height: resize.height }

    const imageStyles: CSSProperties = useMemo(() => ({
        width: `${image.size.width * scale}px`,
        height: `${image.size.height * scale}px`,
        position: "absolute",
        top: `${image.position.y * scale}px`,
        left: `${image.position.x * scale}px`,
        border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [image, scale, isSelected, image.position, image.size, borderIsShown, showSelectionBorder]);

    const resizeHandleStyles: CSSProperties = {
        width: "10px",
        height: "10px",
        backgroundColor: "var(--resize-handle-color, #000)",
        position: "absolute",
        top: `${image.position.y * scale}px`,
        left: `${image.position.x * scale}px`,
        borderRadius: "50%",
        cursor: "pointer",
    };
    return (
        <div>
            <img ref={ref} style={imageStyles} key={image.id} src={image.src} alt="yours" draggable="true"></img>
            {isSelected && showSelectionBorder && borderIsShown && (
                <>
                    <div
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale - 5}px`, left: `${image.position.x * scale - 5}px` }}
                        className="resize-handle top-left"
                    />
                    <div
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale - 5}px`, left: `${image.position.x * scale + image.size.width * scale - 5}px` }}
                        className="resize-handle top-right"
                    />
                    <div
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + image.size.height - 5}px`, left: `${image.position.x * scale - 5}px` }}
                        className="resize-handle bottom-left"
                    />
                    <div
                        ref={resizeRef}
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + image.size.height - 5}px`, left: `${image.position.x * scale + image.size.width * scale - 5}px` }}
                        className="resize-handle bottom-right"
                    />
                    <div
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale - 5}px`, left: `${image.position.x * scale + (image.size.width * scale / 2) - 5}px` }}
                        className="resize-handle top"
                    />
                    <div
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + (image.size.height * scale / 2) - 5}px`, left: `${image.position.x * scale + image.size.width * scale - 5}px` }}
                        className="resize-handle right"
                    />
                    <div
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + image.size.height - 5}px`, left: `${image.position.x * scale + (image.size.width * scale / 2) - 5}px` }}
                        className="resize-handle bottom"
                    />
                    <div
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + (image.size.height * scale / 2) - 5}px`, left: `${image.position.x * scale - 5}px` }}
                        className="resize-handle left"
                    />
                </>
            )}
        </div>
    );
};

export { ImageObject };