import { SlideType } from "../../store/PresentationType"
import { Slide } from "../Slide/Slide"
import styles from "./WorkSpace.module.css"

type WorkSpaceProps = {
    slide: SlideType,
    selectedElementId: string | null,
}

function WorkSpace({ slide, selectedElementId }: WorkSpaceProps) {
    return (
        <div className={styles.workSpace}>
            <Slide
                slide={slide}
                scale={0.9}
                isSelected={true}
                selectedObjId={selectedElementId}
            ></Slide>
        </div>
    )
}

export { WorkSpace, }