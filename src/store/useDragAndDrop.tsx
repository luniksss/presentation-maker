import { MutableRefObject, useEffect } from "react";
import { Position } from "./PresentationType";

const useDragAndDrop = (
    ref: MutableRefObject<HTMLParagraphElement | null>,
    modelPos: Position,
    setPosition: (position: Position) => void
) => {
    useEffect(() => {
        let startPos = { x: 0, y: 0 };

        const onMouseDown = (e: MouseEvent) => {
            startPos = { x: e.pageX, y: e.pageY };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            const delta = { x: e.pageX - startPos.x, y: e.pageY - startPos.y };
            const newPos = { x: modelPos.x + delta.x, y: modelPos.y + delta.y };
            setPosition(newPos);
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        const element = ref.current;
        if (element) {
            element.addEventListener("mousedown", onMouseDown);
        }

        return () => {
            if (element) {
                element.removeEventListener("mousedown", onMouseDown);
            }
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, [ref, modelPos, setPosition]);
};

export { useDragAndDrop };