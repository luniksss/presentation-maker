import styles from './ToolBar.module.css'
import { useContext, useEffect, useState } from 'react'
import Theme from "../../components/theme/Theme"
import { Button } from "../../components/button/Button"
import { HistoryContext } from '../hooks/historyContext'
import { useAppActions } from '../hooks/useAppActions'
import { useAppSelector } from '../hooks/useAppSelector'
import { Link } from 'react-router'
import { Preview } from '../Preview/Preview'
import { useTranslation } from 'react-i18next'
import Translation from '../../components/translation/Translation'
import { ACCESS_KEY, BLACK_COLOR, NETWORK_RESPONSE, PLAYERVIEW_ROUTE, REQUIRED_PARAMETR, WHITE_COLOR } from '../../consts'
import { AvailableFonts } from '../../store/PresentationType'

interface UnsplashImage {
    id: string
    urls: {
        small: string
        full: string
    }
    alt_description: string
}

interface UnsplashResponse {
    results: UnsplashImage[]
}

function ToolBar() {
    const { t } = useTranslation()
    let title = useAppSelector((editor => editor.presentation.title))
    const [inputValue, setInputValue] = useState(title)
    const [openMenu, setOpenMenu] = useState(null)
    const [images, setImages] = useState<UnsplashImage[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [fontSize, setFontSize] = useState<number | ''>('')
    const [fontColor, setFontColor] = useState<string>(BLACK_COLOR)
    const [selectedFont, setSelectedFont] = useState(AvailableFonts[0].name)
    const [showFontList, setShowFontList] = useState(false)

    let gradientColor1 = BLACK_COLOR
    let gradientColor2 = WHITE_COLOR

    useEffect(() => {
        setInputValue(title)
    }, [title])

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
        setEditor,
        editTextFontSize,
        editTextColor,
        editFontFamily } = useAppActions()
    const history = useContext(HistoryContext)

    const toggleMenu = (menu: any) => {
        setOpenMenu(openMenu === menu ? null : menu)
    }

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
        setInputValue(newTitle)
        changeTitle(newTitle)
    }

    function onChangeBackgroundColor(selectedColor: string) {
        changeBackground(selectedColor)
        hideBackgroundOptions()
    }

    function onChangeBackgroundImage(event: HTMLInputElement) {
        const file = event.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                changeBackground(reader.result as string);
            };
            reader.readAsDataURL(file)
            hideBackgroundOptions()
        }
    }

    function onChangeBackgroundGradient() {
        changeBackground(`linear-gradient(${gradientColor1}, ${gradientColor2})`)
        hideGradientOptions()
        hideBackgroundOptions()
    }

    function hideGradientOptions() {
        const optionsContainer = document.getElementById('gradient-options')
        if (optionsContainer) {
            optionsContainer.style.display = 'none'
        }
    }

    function hideBackgroundOptions() {
        const optionsContainer = document.getElementById('background-options')
        if (optionsContainer) {
            optionsContainer.style.display = 'none'
        }
    }

    function onImageAdd(event: HTMLInputElement) {
        const file = event.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                addImageElement(reader.result as string)
            };
            reader.readAsDataURL(file)
        }
    }

    const fetchImages = async (query: string) => {
        if (!query) {
            console.error(REQUIRED_PARAMETR)
            return
        }

        const accessKey = ACCESS_KEY;
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`)

        if (!response.ok) {
            throw new Error(NETWORK_RESPONSE)
        }

        const data: UnsplashResponse = await response.json()
        setImages(data.results)
    };

    const handleImageSelect = (url: string) => {
        addImageElement(url)
        setOpenMenu(null)
    };

    const handleBackgroundImageSelect = (url: string) => {
        changeBackground(url)
        setOpenMenu(null)
    };

    const onChangeFontSize = (size: number) => {
        editTextFontSize(size)
    };

    const onChangeTextColor = (color: string) => {
        editTextColor(color)
    }

    const onChangeFontFamily = (font: string) => {
        setSelectedFont(font)
        setShowFontList(false)
        editFontFamily(font)
    };

    function uploadData(target: HTMLInputElement) {
        if (target.files && target.files[0]) {
            const file = target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const jsonData = JSON.parse(e.target?.result as string)
                importData(jsonData)
            }

            reader.readAsText(file)
        }
    }

    const handleDownloadPDF = () => {
        downloadPDF()
    };

    const enterFullScreen = () => {
        const element = document.documentElement
        if (element.requestFullscreen) {
            element.requestFullscreen()
        }
    };

    return (
        <div className={styles.toolBar}>
            <input className={styles.title} type="text" value={title} onChange={onTitleChange} />
            <div className={styles.toolButtons}>
                <Button onClick={onUndo} className="undoButton"></Button>
                <Button onClick={onRedo} className="redoButton"></Button>
                <button onClick={enterFullScreen} className={styles.slideShowButton}>
                    <Link className="slideShow" to={PLAYERVIEW_ROUTE}>{t('slideShow')}</Link>
                </button>

                <Button className="button" text={t('slide')} onClick={() => toggleMenu('slide')}>
                    {openMenu === 'slide' && (
                        <div className={styles.submenu}>
                            <Button className="button" text={t('addSlide')} onClick={addSlide} />
                            <Button className="button" text={t('removeSlide')} onClick={removeSlide} />
                        </div>
                    )} </Button>

                <Button className="button" text={t('background')} onClick={() => toggleMenu('background')}>
                    {(openMenu === 'background' || openMenu === 'gradient' || openMenu === 'background-unsplash') && (
                        <div className={styles.submenu} id="background-options">
                            <Button className="button" text={t('color')} onClick={() => {
                                const colorInput = document.createElement('input')
                                colorInput.type = 'color'
                                colorInput.defaultValue = "#888888"
                                colorInput.onchange = (e) => onChangeBackgroundColor((e.target as HTMLInputElement).value)
                                colorInput.click()
                            }} />
                            <Button className="button" text={t('computerImage')} onClick={() => {
                                const fileInput = document.createElement('input')
                                fileInput.type = 'file'
                                fileInput.accept = "image/*"
                                fileInput.onchange = (event: Event) => {
                                    const target = event.target as HTMLInputElement
                                    onChangeBackgroundImage(target)
                                }
                                fileInput.click()
                            }} />
                            <Button className="button" text={t('unsplashImage')} onClick={() => toggleMenu('background-unsplash')}>
                                {openMenu === 'background-unsplash' && (
                                    <div className={styles.unsplashMenu}>
                                        <div className={styles.unsplashSearch}>
                                            <input className={styles.searchInput} type="text" placeholder={t('imageSearchRequest')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                            <Button className='acceptButton' text={t('imageSearch')} onClick={() => fetchImages(searchTerm)} />
                                        </div>
                                        <div className={styles.imageGrid}>
                                            {images.map((image) => (
                                                <img key={image.id} src={image.urls.small} alt={image.alt_description} onClick={() => handleBackgroundImageSelect(image.urls.full)} />
                                            ))}
                                        </div>
                                    </div>
                                )} </Button>
                            <Button className="button" text={t('gradient')} onClick={() => toggleMenu('gradient')}>
                                {openMenu === 'gradient' && (
                                    <div className={styles.gradientSubmenu}>
                                        <Button className="button" text={t('color1')} onClick={() => {
                                            const colorInput = document.createElement('input')
                                            colorInput.type = 'color'
                                            colorInput.value = gradientColor1
                                            colorInput.onchange = (e) => {
                                                const selectedColor = (e.target as HTMLInputElement).value
                                                gradientColor1 = selectedColor
                                            }
                                            colorInput.click()
                                        }} />
                                        <Button className="button" text={t('color2')} onClick={() => {
                                            const colorInput = document.createElement('input')
                                            colorInput.type = 'color'
                                            colorInput.value = gradientColor2
                                            colorInput.onchange = (e) => {
                                                const selectedColor = (e.target as HTMLInputElement).value
                                                gradientColor2 = selectedColor
                                            };
                                            colorInput.click()
                                        }} />
                                        <Button className="acceptButton" text={t('acceptButton')} onClick={() => {
                                            onChangeBackgroundGradient()
                                        }} />
                                    </div>
                                )}
                            </Button>
                        </div>
                    )} </Button>

                <Button className="button" text={t('text')} onClick={() => toggleMenu('text')}>
                    {openMenu === 'text' && (
                        <div className={styles.submenu}>
                            <Button className="button" text={t('addText')} onClick={addTextElement} />
                            <Button className="button" text={t('removeText')} onClick={removeElement} />
                            <input
                                className={styles.searchInput}
                                type="number"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                placeholder={t('fontSize')}
                            />
                            <input
                                className={styles.searchInput}
                                type="color"
                                value={fontColor}
                                onChange={(e) => setFontColor(e.target.value)}
                            />
                            <div>
                                <div
                                    className={styles.fontSelector}
                                    onClick={() => setShowFontList(!showFontList)}
                                    style={{ fontFamily: selectedFont }}
                                >
                                    {selectedFont.split(',')[0]}
                                </div>
                                {showFontList && (
                                    <div className={styles.fontList}>
                                        {AvailableFonts.map(font => (
                                            <div
                                                key={font.name}
                                                className={styles.fontItem}
                                                onClick={() => onChangeFontFamily(font.name)}
                                                style={{ fontFamily: font.name }}
                                            >
                                                {font.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Button
                                className="acceptButton"
                                text={t('editText')}
                                onClick={() => {
                                    if (fontSize) {
                                        onChangeFontSize(fontSize);
                                    }
                                    if (fontColor) {
                                        onChangeTextColor(fontColor)
                                    }
                                }}
                            />
                        </div>
                    )} </Button>

                <Button className="button" text={t('image')} onClick={() => toggleMenu('image')}>
                    {(openMenu === 'image' || openMenu === 'unsplash') && (
                        <div className={styles.submenu}>
                            <Button className="button" text={t('computerImage')} onClick={() => {
                                const fileInput = document.createElement('input')
                                fileInput.type = 'file'
                                fileInput.accept = "image/*"
                                fileInput.onchange = (event: Event) => {
                                    const target = event.target as HTMLInputElement;
                                    onImageAdd(target)
                                };
                                fileInput.click()
                            }} />
                            <Button className="button" text={t('unsplashImage')} onClick={() => toggleMenu('unsplash')}>
                                {openMenu === 'unsplash' && (
                                    <div className={styles.unsplashMenu}>
                                        <div className={styles.unsplashSearch}>
                                            <input className={styles.searchInput} type="text" placeholder={t('imageSearchRequest')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                            <Button className='acceptButton' text={t('imageSearch')} onClick={() => fetchImages(searchTerm)} />
                                        </div>
                                        <div className={styles.imageGrid}>
                                            {images.map((image) => (
                                                <img key={image.id} src={image.urls.small} alt={image.alt_description} onClick={() => handleImageSelect(image.urls.full)} />
                                            ))}
                                        </div>
                                    </div>
                                )} </Button>
                            <Button className="button" text={t('removeImage')} onClick={removeElement} />
                        </div>
                    )} </Button>

                <Button className="button" text={t('data')} onClick={() => toggleMenu('data')}>
                    {openMenu === 'data' && (
                        <div className={styles.submenu}>
                            <Button className="button" text={t('exportData')} onClick={exportData} />
                            <Button className="button" text={t('importData')} onClick={() => {
                                const fileInput = document.createElement('input')
                                fileInput.type = 'file'
                                fileInput.accept = ".json"
                                fileInput.onchange = (event: Event) => {
                                    const target = event.target as HTMLInputElement;
                                    uploadData(target)
                                };
                                fileInput.click()
                            }} />
                            <Button className="button" text={t('downloadPDF')} onClick={() => toggleMenu('preview')} />
                        </div>
                    )}
                </Button>
                <Theme></Theme>
                <Translation></Translation>
            </div>
            {openMenu === 'preview' && (
                <div className={styles.downloadPreview}>
                    <div className={styles.previewAccept}>
                        <p>{t('previewAccept')}</p>
                        <Button className="button" text={t('acceptDownload')} onClick={handleDownloadPDF} />
                        <Button className="button" text={t('refuseDownload')} onClick={() => toggleMenu(null)} />
                    </div>
                    <Preview></Preview>
                </div>
            )}
        </div>
    )
}

export { ToolBar }