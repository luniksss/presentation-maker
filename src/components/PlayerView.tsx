import React, { useState } from 'react';
import styles from './PlayerView.module.css';
import { Link } from 'react-router-dom';
import { Slide } from '../view/Slide/Slide';
import { useAppSelector } from '../view/hooks/useAppSelector';

const PlayerView: React.FC = () => {
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

    return (
        <div className={styles.playerViewPage}>
            <Link to="/" className={styles.exitButton} onClick={exitFullScreen}>↩ Exit</Link>
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
