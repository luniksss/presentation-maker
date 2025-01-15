import React, { useEffect, useState } from 'react'
import styles from './PlayerView.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Slide } from '../view/Slide/Slide'
import { useAppSelector } from '../view/hooks/useAppSelector'
import { useTranslation } from 'react-i18next'
import { ARROW_LEFT_KEY, ARROW_RIGHT_KEY, DEFAULT_SCALE, EDITOR_ROUTE, ESCAPE_KEY, FULLSCREEN, KEYDOWN_KEY, PLAYING_SLIDE, SLIDELIST } from '../consts'

const PlayerView: React.FC = () => {
    const { t } = useTranslation()
    const presentation = useAppSelector(editor => editor.presentation)
    const slides = presentation.slides
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const navigate = useNavigate()

    const goToPreviousSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - DEFAULT_SCALE)
        }
    }

    const goToNextSlide = () => {
        if (currentSlideIndex < slides.length - DEFAULT_SCALE) {
            setCurrentSlideIndex(currentSlideIndex + DEFAULT_SCALE)
        }
    }

    const exitFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => {
                console.error(err);
            })
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === ARROW_RIGHT_KEY) {
            goToNextSlide();
        } else if (event.key === ARROW_LEFT_KEY) {
            goToPreviousSlide();
        }
    }

    const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
            navigate(EDITOR_ROUTE);
        }
    };

    useEffect(() => {
        window.addEventListener(KEYDOWN_KEY, handleKeyDown)
        document.addEventListener(FULLSCREEN, handleFullScreenChange)
        return () => {
            window.removeEventListener(KEYDOWN_KEY, handleKeyDown)
            document.removeEventListener(FULLSCREEN, handleFullScreenChange)
        }
    }, [currentSlideIndex, navigate])

    return (
        <div className={styles.playerViewPage}>
            <Link to={EDITOR_ROUTE} className={styles.exitButton} onClick={exitFullScreen}>↩ {t('exit')}</Link>
            <div className={styles.playerViewSlide}>
                <Slide
                    slide={slides[currentSlideIndex]}
                    scale={1.4}
                    isSelected={false}
                    className={PLAYING_SLIDE}
                    departurePoint={SLIDELIST} />
            </div>
            <div className={styles.flippingSlides}>
                <button
                    className={styles.flipButton}
                    id={styles.left}
                    onClick={goToPreviousSlide}
                    disabled={currentSlideIndex === 0}>
                    ⬅
                </button>
                <button
                    className={styles.flipButton}
                    id={styles.right}
                    onClick={goToNextSlide}
                    disabled={currentSlideIndex === slides.length - DEFAULT_SCALE}>
                    ⮕
                </button>
            </div>
        </div>
    )
}

export default PlayerView