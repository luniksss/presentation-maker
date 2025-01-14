import { Slide } from "../Slide/Slide"
import styles from './Preview.module.css'
import { useAppSelector } from '../hooks/useAppSelector'
import { useTranslation } from 'react-i18next'
import { RESIZE_SCALE, SLIDELIST } from "../../consts"
import { calculateDownloadPreviewtScale } from "../../utils/scaleCount"
import { useEffect, useState } from "react"

const Preview = () => {
    const { t } = useTranslation()
    const presentation = useAppSelector(editor => editor.presentation)
    const selection = useAppSelector(editor => editor.selection)
    const slides = presentation.slides
    const [scale, setScale] = useState(calculateDownloadPreviewtScale())

    useEffect(() => {
        const handleResize = () => {
            setScale(calculateDownloadPreviewtScale())
        }

        window.addEventListener(RESIZE_SCALE, handleResize)
        return () => {
            window.removeEventListener(RESIZE_SCALE, handleResize)
        }
    }, [])

    return (
        <div className={styles.slideContainer}>
            <div className={styles.slideList}>
                {slides.length === 0 ? (
                    <p>{t('emptySlideList')}</p>
                ) : (
                    slides.map((slide, index) => (
                        <Slide
                            slide={slide}
                            scale={scale}
                            isSelected={slide.id === selection.slideIds?.[0]}
                            className={styles.slideListItem}
                            showSelectionBorder={false}
                            departurePoint={SLIDELIST}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export { Preview }
