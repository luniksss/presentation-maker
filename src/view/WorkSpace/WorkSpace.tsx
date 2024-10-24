import { SlideType } from "../../store/PresentationType"
import { Slide } from "../Slide/Slide"
import { dispatch } from "../../store/editor"
import { setSelection } from "../../store/setSelection"

type WorkSpaceProps = {
    slide: SlideType,
}

function WorkSpace({ slide }: WorkSpaceProps) {
    const handleClick = () => {
        dispatch(setSelection, { slideId: slide.id });
    };

    return (
        <Slide
            slide={slide}
            scale={1}
            isSelected={true}
            onClick={handleClick}
        ></Slide>
    )
}

export { WorkSpace, }