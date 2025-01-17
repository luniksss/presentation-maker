import { useEffect, useRef, useState } from "react"
import { useAppActions } from "./useAppActions"
import { Position, Size, UpdateSize } from "../../store/PresentationType"
import { useAppSelector } from "./useAppSelector"
import { MIN_SIZE } from "../../consts"

const useResize = (
    initialSize: Size,
    initialPosition: Position
) => {
    const selectedSlideId = useAppSelector((editor) => editor.selection.slideIds?.[0])
    const { setSize, setPosition } = useAppActions()
    const [sizeElement, setSizeElement] = useState(initialSize)
    const [resizePosition, setResizePosition] = useState(initialPosition)
    const [resizeType, setResizeType] = useState<UpdateSize | null>(null)
    const ref = useRef<HTMLDivElement | null>(null)
    let newX = initialPosition.x
    let newY = initialPosition.y
    let startBottom = initialPosition.y + initialSize.height
    let startRight = initialPosition.x + initialSize.width

    const handleMouseMove = (event: MouseEvent) => {
        if (resizeType && ref.current) {
            const currentElement = ref.current.getBoundingClientRect();
            let newWidth = sizeElement.width
            let newHeight = sizeElement.height
            let deltaY, deltaX = 0
            switch (resizeType) {
                case 'diagonal-right-bottom':
                    newWidth = Math.max(event.clientX - currentElement.left, MIN_SIZE)
                    newHeight = Math.max(event.clientY - currentElement.top, MIN_SIZE)
                    break
                case 'horizontal-right':
                    newWidth = Math.max(event.clientX - currentElement.left, MIN_SIZE)
                    break
                case 'vertical-bottom':
                    newHeight =  Math.max(event.clientY - currentElement.top, MIN_SIZE)
                    break
                case 'diagonal-left-top':
                    deltaX = event.clientX - startRight
                    deltaY = event.clientY - startBottom
                    newWidth =  Math.max(sizeElement.width - deltaX, MIN_SIZE)
                    if (sizeElement.height - deltaY < 0) {
                        newHeight = Math.max(-(sizeElement.height - deltaY), MIN_SIZE)
                    } else {
                        newHeight = Math.max(sizeElement.height - deltaY, MIN_SIZE)
                    }
                    newX = startRight - newWidth
                    newY = startBottom - newHeight
                    break
                case 'horizontal-left':
                    deltaX = event.clientX - startRight
                    newWidth =  Math.max(sizeElement.width - deltaX, MIN_SIZE)
                    newX = startRight - newWidth
                    break
                case 'diagonal-right-top':
                    deltaX = currentElement.left - event.clientX
                    deltaY = event.clientY - startBottom
                    newWidth =  Math.max(sizeElement.width - deltaX, MIN_SIZE)
                    if (sizeElement.height - deltaY < 0) {
                        newHeight = Math.max(-(sizeElement.height - deltaY), MIN_SIZE)
                    } else {
                        newHeight = Math.max(sizeElement.height - deltaY, MIN_SIZE)
                    }
                    newY = startBottom - newHeight
                    break
                case 'vertical-top':
                    deltaY = event.clientY - startBottom
                    if (sizeElement.height - deltaY < 0) {
                        newHeight = Math.max(-(sizeElement.height - deltaY), MIN_SIZE)
                    } else {
                        newHeight = Math.max(sizeElement.height - deltaY, MIN_SIZE)
                    }
                    newY = startBottom - newHeight
                    break
                case 'diagonal-left-bottom':
                    deltaX = event.clientX - startRight
                    deltaY = startBottom - event.clientY
                    newWidth =  Math.max(sizeElement.width - deltaX, MIN_SIZE)
                    newHeight = Math.max(sizeElement.height - deltaY, MIN_SIZE)
                    newX = startRight - newWidth
                    break;
            }

            if (newX < 0) {
                const diff = -newX
                newX = 0
                if (resizeType.includes('left')) {
                    newWidth -= diff
                }
            }

            if (newY < 0) {
                const diff = -newY;
                newY = 0;
                if (resizeType.includes('top')) {
                    newHeight -= diff;
                }
            }

            setSizeElement({
                width: newWidth,
                height: newHeight
            });

            setResizePosition({
                x: newX,
                y: newY
            });
        }
    };

    const handleMouseUp = (event: MouseEvent) => {
        if (ref.current) {
            const currentElement = ref.current.getBoundingClientRect()
            if (selectedSlideId) {
                setSize({
                    width: currentElement.right - currentElement.left,
                    height: currentElement.bottom - currentElement.top
                })
            }
        }
        setResizeType(null)
    };

    const handleResizeMouseDown = (type: UpdateSize) => (event: React.MouseEvent) => {
        event.stopPropagation()
        setResizeType(type)
    };

    useEffect(() => {
        if (resizeType) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [resizeType])

    return {
        sizeElement,
        resizePosition,
        handleResizeMouseDown,
        setSizeElement,
        setResizePosition,
        ref
    }
}

export { useResize }