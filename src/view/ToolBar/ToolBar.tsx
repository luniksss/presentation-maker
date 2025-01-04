import styles from './ToolBar.module.css';
import * as React from "react";
import Theme from "../../components/theme/Theme";
import { Button } from "../../components/button/Button";
import { HistoryContext } from '../hooks/historyContext';
import { useAppActions } from '../hooks/useAppActions';
import { useAppSelector } from '../hooks/useAppSelector';
import { Link } from 'react-router';

interface UnsplashImage {
    id: string;
    urls: {
        small: string;
        full: string;
    };
    alt_description: string;
}

interface UnsplashResponse {
    results: UnsplashImage[];
}

function ToolBar() {
    let title = useAppSelector((editor => editor.presentation.title))
    const [inputValue, setInputValue] = React.useState(title);
    const [openMenu, setOpenMenu] = React.useState(null);
    const [images, setImages] = React.useState<UnsplashImage[]>([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    let gradientColor1 = '#ffffff';
    let gradientColor2 = '#000000'


    React.useEffect(() => {
        setInputValue(title);
    }, [title]);

    const { addSlide,
        removeSlide,
        addTextElement,
        addImageElement,
        changeTitle,
        removeElement,
        changeBackground,
        exportData,
        downloadPDF,
        importData,
        setEditor } = useAppActions();
    const history = React.useContext(HistoryContext);

    const toggleMenu = (menu: any) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    function onUndo() {
        const newEditor = history.undo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onRedo() {
        const newEditor = history.redo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        let newTitle = (event.target as HTMLInputElement).value
        setInputValue(newTitle);
        changeTitle(newTitle);
    }

    function onChangeBackgroundColor(selectedColor: string) {
        changeBackground(selectedColor);
        hideBackgroundOptions();
    }

    function onChangeBackgroundImage(event: HTMLInputElement) {
        const file = event.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                changeBackground(reader.result as string);
            };
            reader.readAsDataURL(file);
            hideBackgroundOptions();
        }
    }

    function onChangeBackgroundGradient() {
        changeBackground(`linear-gradient(${gradientColor1}, ${gradientColor2})`);
        hideGradientOptions();
        hideBackgroundOptions();
    }

    function hideGradientOptions() {
        const optionsContainer = document.getElementById('gradient-options');
        if (optionsContainer) {
            optionsContainer.style.display = 'none';
        }
    }

    function hideBackgroundOptions() {
        const optionsContainer = document.getElementById('background-options');
        if (optionsContainer) {
            optionsContainer.style.display = 'none';
        }
    }

    function onImageAdd(event: HTMLInputElement) {
        const file = event.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                addImageElement(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const fetchImages = async (query: string) => {
        if (!query) {
            console.error('Query parameter is required');
            return;
        }

        const accessKey = 'J5T8HbG2s9h2Pq050okm_dekP6b0jI_0FdGe3YlHKOU';
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: UnsplashResponse = await response.json();
        setImages(data.results);
    };

    const handleImageSelect = (url: string) => {
        addImageElement(url);
        setOpenMenu(null);
    };

    const handleBackgroundImageSelect = (url: string) => {
        changeBackground(url);
        setOpenMenu(null);
    };

    function uploadData(target: HTMLInputElement) {
        if (target.files && target.files[0]) {
            const file = target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const jsonData = JSON.parse(e.target?.result as string);
                importData(jsonData);
            };

            reader.readAsText(file);
        }
    }

    const enterFullScreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
    };


    return (
        <div className={styles.toolBar}>
            <input className={styles.title} type="text" value={title} onChange={onTitleChange} />
            <div className={styles.toolButtons}>
                <Button onClick={onUndo} className="undoButton"></Button>
                <Button onClick={onRedo} className="redoButton"></Button>
                <button onClick={enterFullScreen} className={styles.slideShowButton}><Link className="slideShow" to="/player">Slideshow</Link></button>

                <Button className="button" text="Slide" onClick={() => toggleMenu('slide')}>
                    {openMenu === 'slide' && (
                        <div className={styles.submenu}>
                            <Button className="button" text="Add Slide" onClick={addSlide} />
                            <Button className="button" text="Remove Slide" onClick={removeSlide} />
                        </div>
                    )} </Button>

                <Button className="button" text="Background" onClick={() => toggleMenu('background')}>
                    {(openMenu === 'background' || openMenu === 'gradient' || openMenu === 'background-unsplash') && (
                        <div className={styles.submenu} id="background-options">
                            <Button className="button" text="Color" onClick={() => {
                                const colorInput = document.createElement('input');
                                colorInput.type = 'color';
                                colorInput.defaultValue = "#888888";
                                colorInput.onchange = (e) => onChangeBackgroundColor((e.target as HTMLInputElement).value);
                                colorInput.click();
                            }} />
                            <Button className="button" text="Image from computer" onClick={() => {
                                const fileInput = document.createElement('input');
                                fileInput.type = 'file';
                                fileInput.accept = "image/*";
                                fileInput.onchange = (event: Event) => {
                                    const target = event.target as HTMLInputElement;
                                    onChangeBackgroundImage(target);
                                };
                                fileInput.click();
                            }} />
                            <Button className="button" text="Image from Unsplash" onClick={() => toggleMenu('background-unsplash')}>
                                {openMenu === 'background-unsplash' && (
                                    <div className={styles.unsplashMenu}>
                                        <div className={styles.unsplashSearch}>
                                            <input className={styles.searchInput} type="text" placeholder="Search images..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                            <Button className='acceptButton' text="Search" onClick={() => fetchImages(searchTerm)} />
                                        </div>
                                        <div className={styles.imageGrid}>
                                            {images.map((image) => (
                                                <img key={image.id} src={image.urls.small} alt={image.alt_description} onClick={() => handleBackgroundImageSelect(image.urls.full)} />
                                            ))}
                                        </div>
                                    </div>
                                )} </Button>
                            <Button className="button" text="Gradient" onClick={() => toggleMenu('gradient')}>
                                {openMenu === 'gradient' && (
                                    <div className={styles.gradientSubmenu}>
                                        <Button className="button" text="Цвет 1" onClick={() => {
                                            const colorInput = document.createElement('input');
                                            colorInput.type = 'color';
                                            colorInput.value = gradientColor1;
                                            colorInput.onchange = (e) => {
                                                const selectedColor = (e.target as HTMLInputElement).value;
                                                gradientColor1 = selectedColor;
                                            };
                                            colorInput.click();
                                        }} />
                                        <Button className="button" text="Цвет 2" onClick={() => {
                                            const colorInput = document.createElement('input');
                                            colorInput.type = 'color';
                                            colorInput.value = gradientColor2;
                                            colorInput.onchange = (e) => {
                                                const selectedColor = (e.target as HTMLInputElement).value;
                                                gradientColor2 = selectedColor;
                                            };
                                            colorInput.click();
                                        }} />
                                        <Button className="acceptButton" text="ОК" onClick={() => {
                                            onChangeBackgroundGradient();
                                        }} />
                                    </div>
                                )}
                            </Button>
                        </div>
                    )} </Button>

                <Button className="button" text="Text" onClick={() => toggleMenu('text')}>
                    {openMenu === 'text' && (
                        <div className={styles.submenu}>
                            <Button className="button" text="Add Text" onClick={addTextElement} />
                            <Button className="button" text="Remove Text" onClick={removeElement} />
                        </div>
                    )} </Button>

                <Button className="button" text="Image" onClick={() => toggleMenu('image')}>
                    {(openMenu === 'image' || openMenu === 'unsplash') && (
                        <div className={styles.submenu}>
                            <Button className="button" text="Add from computer" onClick={() => {
                                const fileInput = document.createElement('input');
                                fileInput.type = 'file';
                                fileInput.accept = "image/*";
                                fileInput.onchange = (event: Event) => {
                                    const target = event.target as HTMLInputElement;
                                    onImageAdd(target);
                                };
                                fileInput.click();
                            }} />
                            <Button className="button" text="Add from Unsplash" onClick={() => toggleMenu('unsplash')}>
                                {openMenu === 'unsplash' && (
                                    <div className={styles.unsplashMenu}>
                                        <div className={styles.unsplashSearch}>
                                            <input className={styles.searchInput} type="text" placeholder="Search images..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                            <Button className='acceptButton' text="Search" onClick={() => fetchImages(searchTerm)} />
                                        </div>
                                        <div className={styles.imageGrid}>
                                            {images.map((image) => (
                                                <img key={image.id} src={image.urls.small} alt={image.alt_description} onClick={() => handleImageSelect(image.urls.full)} />
                                            ))}
                                        </div>
                                    </div>
                                )} </Button>
                            <Button className="button" text="Remove Image" onClick={removeElement} />
                        </div>
                    )} </Button>

                <Button className="button" text="Data" onClick={() => toggleMenu('data')}>
                    {openMenu === 'data' && (
                        <div className={styles.submenu}>
                            <Button className="button" text="Export Data" onClick={exportData} />
                            <Button className="button" text="Import Data" onClick={() => {
                                const fileInput = document.createElement('input');
                                fileInput.type = 'file';
                                fileInput.accept = ".json";
                                fileInput.onchange = (event: Event) => {
                                    const target = event.target as HTMLInputElement;
                                    uploadData(target);
                                };
                                fileInput.click();
                            }} />
                            <Button className="button" text="Download PDF" onClick={downloadPDF} />
                        </div>
                    )} </Button>

                <Theme></Theme>
            </div>
        </div>
    );
};

export { ToolBar };