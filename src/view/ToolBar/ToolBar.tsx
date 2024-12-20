import styles from './ToolBar.module.css';
import * as React from "react";
import Theme from "../../components/theme/Theme";
import { Button } from "../../components/button/Button";
import { HistoryContext } from '../hooks/historyContext';
import { useAppActions } from '../hooks/useAppActions';
import { useAppSelector } from '../hooks/useAppSelector';

function ToolBar() {
    let title = useAppSelector((editor => editor.presentation.title))
    const [inputValue, setInputValue] = React.useState(title);

    React.useEffect(() => {
        setInputValue(title);
    }, [title]);

    const {addSlide, 
        removeSlide, 
        addTextElement, 
        addImageElement,
        changeTitle,
        removeElement,
        changeBackground,
        exportData,
        importData, setEditor} = useAppActions();
    const history = React.useContext(HistoryContext);
 
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

    function showBackgroundOptions() {
        const optionsContainer = document.getElementById('background-options');
        if (optionsContainer) {
            optionsContainer.style.display = 'inline-block';
        }
    }

    function hideBackgroundOptions() {
        const optionsContainer = document.getElementById('background-options');
        if (optionsContainer) {
            optionsContainer.style.display = 'none';
        }
    }

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
    
    return (
        <div className={styles.toolBar}>
            <input className={styles.title} type="text" value={title} onChange={onTitleChange}/>
            <div className={styles.toolButtons}>
                <Button onClick={onUndo} className="undoButton"></Button>
                <Button onClick={onRedo} className="redoButton"></Button>
                <Button className="button" text={'Add Slide'} onClick={addSlide}></Button>
                <Button className="button" text={'Remove Slide'} onClick={removeSlide}></Button>
                <Button className="button" text={'Add Text'} onClick={addTextElement}></Button>
                <Button className="button" text={'Add Image'} onClick={addImageElement}></Button>
                <Button className="button" text={'Remove Text'} onClick={removeElement}></Button>
                <Button className="button" text={'Remove Image'} onClick={removeElement}></Button>
                <Button className="button" text={'Change Background'} onClick={showBackgroundOptions}></Button>
                <Button className="button" text={'Export Data'} onClick={exportData}></Button>
                <Button className="button" text={'Import Data'} onClick={() => {
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.accept = ".json";
                        fileInput.onchange = (event: Event) => {
                            const target = event.target as HTMLInputElement;
                            uploadData(target);
                        };
                        fileInput.click();
                    }}></Button>
                <Theme></Theme>
                <div className={styles.backgroundOptions} id="background-options">
                    <Button className="additionalButton" text={'Color'} onClick={() => {
                        hideBackgroundOptions();
                        const colorInput = document.createElement('input');
                        colorInput.type = 'color';
                        colorInput.defaultValue = "#888888";
                        colorInput.onchange = (e) => onChangeBackgroundColor((e.target as HTMLInputElement).value);
                        colorInput.click();
                    }}></Button>
                    <Button className="additionalButton" text={'Image'} onClick={() => {
                        hideBackgroundOptions();
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.accept = "image/*";
                        fileInput.onchange = (event: Event) => {
                            const target = event.target as HTMLInputElement;
                            onChangeBackgroundImage(target);
                        };
                        fileInput.click();
                    }}></Button>
                    <Button className="button" text={'x'} onClick={() => {hideBackgroundOptions()}}></Button>
                </div>
            </div>
        </div>
    )
}

export { ToolBar };