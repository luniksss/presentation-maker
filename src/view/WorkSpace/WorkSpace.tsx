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
            {slide ? (
                <Slide
                    slide={slide}
                    scale={1}
                    isSelected={true}
                    selectedObjId={selectedElementId}
                    showSelectionBorder={true}
                    departurePoint={"WorkSpace"}
                />
            ) : (
                <p>Создайте и выберите слайд</p>
            )}
        </div>
    );
}

export { WorkSpace }