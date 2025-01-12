import React, { useEffect, useState } from 'react';
import styles from './PlayerView.module.css';
import { Link } from 'react-router-dom';
import { Slide } from '../view/Slide/Slide';
import { useAppSelector } from '../view/hooks/useAppSelector';
import { useTranslation } from 'react-i18next';

const PlayerView: React.FC = () => {
    const { t } = useTranslation();
    const presentation = useAppSelector(editor => editor.presentation);
    const slides = presentation.slides;

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const goToPreviousSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    const goToNextSlide = () => {
        if (currentSlideIndex < slides.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const exitFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => {
                console.error("Error exiting full screen:", err);
            });
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
            goToNextSlide();
        } else if (event.key === 'ArrowLeft') {
            goToPreviousSlide();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSlideIndex]);

    return (
        <div className={styles.playerViewPage}>
            <Link to="/editor" className={styles.exitButton} onClick={exitFullScreen}>↩ {t('exit')}</Link>
            <div className={styles.playerViewSlide}>
                <Slide
                    slide={slides[currentSlideIndex]}
                    scale={1.4}
                    isSelected={false}
                    className="playingSlide"
                    departurePoint={"SlideList"} />
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
                    disabled={currentSlideIndex === slides.length - 1}>
                    ⮕
                </button>
            </div>
        </div>
    );
};

export default PlayerView;
