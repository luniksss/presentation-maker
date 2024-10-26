import { Button } from "../../components/button/Button";
import { addSlide } from "../../store/addSlide";
import { addElement } from "../../store/addElement";
import { dispatch } from "../../store/editor";
import { removeSlide } from "../../store/removeSlide";
import styles from './ToolBar.module.css';
import { changeBackground } from "../../store/changeBackground";
import { renamePresentation } from "../../store/renamePresentation";
import { deleteElement } from "../../store/deleteElement";
import Theme from "../../components/theme/Theme";

type ToolBarProps = {
    title: string,
}

function ToolBar({title}: ToolBarProps) {

    function generateRandomId(length: number = 5): string { 
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
        let result = ''; 
     
        for (let i = 0; i < length; i++) { 
            const randomIndex = Math.floor(Math.random() * characters.length); 
            result += characters[randomIndex]; 
        } 
     
        return result; 
    }

    function onAddSlide() {
        dispatch(addSlide, { id: generateRandomId(), background: "#ffffff", elements: [] });
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    function onAddText() {
        dispatch(addElement, { id: generateRandomId(), size: {width: 600, height: 100}, position: {x: 10, y: 10}, type: 'text', content: "Your text", fontSize: 14, fontFamily: "Times New Roman"})
    }

    function onAddImage() {
        dispatch(addElement, {id: generateRandomId(), size: {width: 200, height: 200}, position: {x: 15, y: 15}, type: 'image', src: "/assets/newTestImg.jpg"})
    }
 
    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentation, (event.target as HTMLInputElement).value)
    }
    
    function onRemoveElement() {
        dispatch(deleteElement)
    }
    
    function onChangeBackgroundColor(selectedColor: string) {
        dispatch(changeBackground, selectedColor);
        hideBackgroundOptions();
    }

    function onChangeBackgroundImage(event: HTMLInputElement) {
        const file = event.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(changeBackground, reader.result as string);
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
    
    return (
        <div className={styles.toolBar}>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
            <div className={styles.toolButtons}>
                <Button className={styles.button} text={'Add Slide'} onClick={onAddSlide}></Button>
                <Button className={styles.button} text={'Remove Slide'} onClick={onRemoveSlide}></Button>
                <Button className={styles.button} text={'Add Text'} onClick={onAddText}></Button>
                <Button className={styles.button} text={'Add Image'} onClick={onAddImage}></Button>
                <Button className={styles.button} text={'Remove Text'} onClick={onRemoveElement}></Button>
                <Button className={styles.button} text={'Remove Image'} onClick={onRemoveElement}></Button>
                <Button className={styles.button} text={'Change Background'} onClick={showBackgroundOptions}></Button>
                <Theme></Theme>
                <div className={styles.backgroundOptions} id="background-options">
                    <Button className={styles.button} text={'Color'} onClick={() => {
                        hideBackgroundOptions();
                        const colorInput = document.createElement('input');
                        colorInput.type = 'color';
                        colorInput.defaultValue = "#888888";
                        colorInput.onchange = (e) => onChangeBackgroundColor((e.target as HTMLInputElement).value);
                        colorInput.click();
                    }}></Button>
                    <Button className={styles.button} text={'Image'} onClick={() => {
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
                    <Button className={styles.button} text={'x'} onClick={() => {hideBackgroundOptions()}}></Button>
                </div>
            </div>
        </div>
    )
}

export { ToolBar, };