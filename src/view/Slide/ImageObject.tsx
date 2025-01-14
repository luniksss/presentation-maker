import { ImageElement, ResizeHandle } from "../../store/PresentationType"
import { CSSProperties, useEffect, useMemo } from "react"
import { useDragAndDrop } from "../hooks/useDragAndDrop"
import { useResize } from "../hooks/useResize"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppActions } from "../hooks/useAppActions"
import { DEFAULT_SCALE, DELETE, KEYDOWN_KEY, MIN_WIDTH_SCALE } from "../../consts"

type ImageProps = {
    image: ImageElement,
    scale?: number,
    isSelected: boolean,
    showSelectionBorder?: boolean,
    borderIsShown: boolean,
}

const ImageObject = ({ image, scale = DEFAULT_SCALE, isSelected, showSelectionBorder, borderIsShown }: ImageProps) => {
    const selection = useAppSelector((editor) => editor.selection)
    const { removeElement } = useAppActions()
    const { localPosition, handleMouseDown, setLocalPosition } = useDragAndDrop(image.position, image.id, selection, isSelected)
    const { sizeElement, resizePosition, handleResizeMouseDown, setSizeElement, setResizePosition, ref } = useResize(image.size, localPosition)

    useEffect(() => {
        setLocalPosition(resizePosition)
    }, [resizePosition])
    
    useEffect(() => {
        setLocalPosition(image.position)
        setSizeElement(image.size)
    }, [image])

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === DELETE) {
            if (isSelected) {
                event.preventDefault()
                removeElement()
            }
        }
    };

    useEffect(() => {
        window.addEventListener(KEYDOWN_KEY, handleKeyDown)
        return () => {
            window.removeEventListener(KEYDOWN_KEY, handleKeyDown)
        }
    }, [isSelected])

    const resizeHandles: ResizeHandle[] = [
        { type: 'diagonal-right-bottom', style: { bottom: -5, right: -5, cursor: 'nwse-resize' } },
        { type: 'horizontal-right', style: { bottom: '50%', right: -5, cursor: 'ew-resize' } },
        { type: 'vertical-bottom', style: { bottom: -5, right: '50%', cursor: 'ns-resize' } },
        { type: 'diagonal-left-top', style: { top: -5, left: -5, cursor: 'nwse-resize'} },
        { type: 'vertical-top', style: { top: -5, left: '50%', cursor: 'ns-resize'} },
        { type: 'diagonal-right-top', style: { top: -5, right: -5, cursor: 'nwse-resize' } },
        { type: 'horizontal-left', style: { bottom: '50%', left: -5, cursor: 'ew-resize' } },
        { type: 'diagonal-left-bottom', style: { bottom: -5, left: -5, cursor: 'nwse-resize' } },
    ]

    const imageBlockStyles: CSSProperties = useMemo(() => ({
        width: `${sizeElement.width * scale}px`,
        height: `${sizeElement.height * scale}px`,
        position: "relative",
        top: `${localPosition.y * scale}px`,
        left: `${localPosition.x * scale}px`,
    }), [scale, localPosition, sizeElement])

    const imageStyles: CSSProperties = useMemo(() => ({
        width: `${sizeElement.width * scale}px`,
        height: `${sizeElement.height * scale}px`,
        position: "absolute",
        border: (isSelected && showSelectionBorder && borderIsShown) ? '3px solid var(--selection)' : '3px solid transparent',
    }), [scale, isSelected, sizeElement, borderIsShown, showSelectionBorder])

    const resizeHandleStyles: CSSProperties = {
        width: "10px",
        height: "10px",
        backgroundColor: "var(--resize-handle-color, #000)",
        position: "absolute",
        cursor: "pointer",
    }

    return (
        <div ref={ref} onMouseDown={scale >= MIN_WIDTH_SCALE ? handleMouseDown : undefined} style={imageBlockStyles}>
            <img style={imageStyles} key={image.id} src={image.src} alt="picture" draggable="true"></img>
            <div>
                {isSelected && borderIsShown && resizeHandles.map(handle => {
                    const handleStyle: CSSProperties = {
                        ...resizeHandleStyles,
                        bottom: handle.style.bottom,
                        right: handle.style.right,
                        top: handle.style.top,
                        left: handle.style.left,
                    }

                    return (
                        <div
                            key={handle.type}
                            onMouseDown={handleResizeMouseDown(handle.type)}
                            style={handleStyle}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export { ImageObject }