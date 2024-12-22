import { ImageElement, Position } from "../../store/PresentationType";
import { CSSProperties, useMemo, useRef, useState } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useResize } from "../hooks/useResize";
import { useAppActions } from "../hooks/useAppActions";

type ImageProps = {
    image: ImageElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    borderIsShown: boolean,
}

const ImageObject = ({ image, scale = 1, isSelected, showSelectionBorder, borderIsShown }: ImageProps) => {
    const [localPosition, setLocalPosition] = useState<Position>({ x: image.position.x, y: image.position.y });
    const [resize, setResize] = useState({ width: image.size.width, height: image.size.height, x: image.position.x, y: image.position.y});
    const ref = useRef<HTMLImageElement | null>(null);
    const { setPosition } = useAppActions()

    const resizeRefs = [
        useRef<HTMLDivElement | null>(null), // top-left
        useRef<HTMLDivElement | null>(null), // top-right
        useRef<HTMLDivElement | null>(null), // bottom-left
        useRef<HTMLDivElement | null>(null), // bottom-right
        useRef<HTMLDivElement | null>(null), // top
        useRef<HTMLDivElement | null>(null), // right
        useRef<HTMLDivElement | null>(null), // bottom
        useRef<HTMLDivElement | null>(null), // left
    ];

    useDragAndDrop(ref, setLocalPosition, (newPos) => setPosition(newPos));
    const handleResize = (width: number, height: number, x: number, y: number) => {
        setResize({ width, height, x, y });
    };
    
    useResize(resizeRefs[0], ref, 'top-left', handleResize);
    useResize(resizeRefs[1], ref, 'top-right', handleResize);
    useResize(resizeRefs[2], ref, 'bottom-left', handleResize);
    useResize(resizeRefs[3], ref, 'bottom-right', handleResize);
    useResize(resizeRefs[4], ref, 'top', handleResize);
    useResize(resizeRefs[5], ref, 'right', handleResize);
    useResize(resizeRefs[6], ref, 'bottom', handleResize);
    useResize(resizeRefs[7], ref, 'left', handleResize);

    const imageStyles: CSSProperties = useMemo(() => ({
        width: `${image.size.width * scale}px`,
        height: `${image.size.height * scale}px`,
        position: "absolute",
        top: `${image.position.y * scale}px`,
        left: `${image.position.x * scale}px`,
        border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [scale, isSelected, image.position, image.size, borderIsShown, showSelectionBorder]);

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
                        ref={resizeRefs[0]}
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale - 5}px`, left: `${image.position.x * scale - 5}px` }}
                        className="resize-handle" id="top-left"
                    />
                    <div
                        ref={resizeRefs[1]}
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale - 5}px`, left: `${image.position.x * scale + image.size.width * scale - 5}px` }}
                        className="resize-handle" id="top-right"
                    />
                    <div
                        ref={resizeRefs[2]}
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + image.size.height - 5}px`, left: `${image.position.x * scale - 5}px` }}
                        className="resize-handle" id="bottom-left"
                    />
                    <div
                        ref={resizeRefs[3]}
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + image.size.height - 5}px`, left: `${image.position.x * scale + image.size.width * scale - 5}px` }}
                        className="resize-handle" id="bottom-right"
                    />
                    <div
                        ref={resizeRefs[4]}
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale - 5}px`, left: `${image.position.x * scale + (image.size.width * scale / 2) - 5}px` }}
                        className="resize-handle" id="top"
                    />
                    <div
                        ref={resizeRefs[5]}
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + (image.size.height * scale / 2) - 5}px`, left: `${image.position.x * scale + image.size.width * scale - 5}px` }}
                        className="resize-handle" id="right"
                    />
                    <div
                        ref={resizeRefs[6]}
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + image.size.height - 5}px`, left: `${image.position.x * scale + (image.size.width * scale / 2) - 5}px` }}
                        className="resize-handle" id="bottom"
                    />
                    <div
                        ref={resizeRefs[7]}
                        style={{ ...resizeHandleStyles, top: `${image.position.y * scale + (image.size.height * scale / 2) - 5}px`, left: `${image.position.x * scale - 5}px` }}
                        className="resize-handle" id="left"
                    />
                </>
            )}
        </div>
    );
};

export { ImageObject };