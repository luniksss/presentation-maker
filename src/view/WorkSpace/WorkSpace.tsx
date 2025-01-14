import { SlideType } from "../../store/PresentationType"
import { Slide } from "../Slide/Slide"
import styles from "./WorkSpace.module.css"
import { useAppSelector } from '../hooks/useAppSelector'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from "react"
import { calculateWorkSpaceScale } from "../../utils/scaleCount"
import { RESIZE_SCALE, WORKSPACE } from "../../consts"

const WorkSpace = () => {
    const { t } = useTranslation()
    const presentation = useAppSelector((editor) => editor.presentation)
    const selection = useAppSelector((editor) => editor.selection)
    const slides = presentation.slides
    const slide: SlideType = slides.find(slide => slide.id === selection?.slideIds?.[0]) || slides[0]
    const [scale, setScale] = useState(calculateWorkSpaceScale())

    useEffect(() => {
        const handleResize = () => {
            setScale(calculateWorkSpaceScale())
        }

        window.addEventListener(RESIZE_SCALE, handleResize)
        return () => {
            window.removeEventListener(RESIZE_SCALE, handleResize)
        }
    }, [])

    return (
        <div className={styles.workSpace}>
            {slide ? (
                <Slide
                    slide={slide}
                    scale={scale}
                    isSelected={true}
                    showSelectionBorder={true}
                    departurePoint={WORKSPACE}
                />
            ) : (
                <p>{t('workspaceSlideNotFound')}</p>
            )}
        </div>
    );
}


export { WorkSpace }