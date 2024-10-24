import { Button } from "../../components/button/Button";
import { addSlide } from "../../store/addSlide";
import { addElement } from "../../store/addElement";
import { dispatch } from "../../store/editor";
import { removeSlide } from "../../store/removeSlide";
import styles from './ToolBar.module.css';
import { changeBackground } from "../../store/changeBackground";
import { renamePresentation } from "../../store/renamePresentation";
let count = 2;

type ToolBarProps = {
    title: string,
}

function ToolBar({title}: ToolBarProps) {

    function generateId(): number {
        const newId = count;
        count += 1
        return newId;
    }

    function onAddSlide() {
        dispatch(addSlide, { id: generateId(), background: "#fff", elements: [] });
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    function onAddText() {
        dispatch(addElement, { id: generateId(), size: {width: 600, height: 100}, position: {x: 10, y: 10}, type: 'text', content: "Your text", fontSize: 14, fontFamily: "Times New Roman"})
    }

    function onAddImage() {
        dispatch(addElement, {id: generateId(), size: {width: 200, height: 200}, position: {x: 15, y: 15}, type: 'image', src: "/assets/newTestImg.jpg"})
    }

    function onChangeBackground() {
        dispatch(changeBackground, "#888")
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentation, (event.target as HTMLInputElement).value)
    }

    function onRemoveText() {

    }

    function onRemoveImage() {

    }
    
    return (
        <div className={styles.toolBar}>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
            <div className={styles.toolButtons}>
                <Button className={styles.button} text={'Add Slide'} onClick={onAddSlide}></Button>
                <Button className={styles.button} text={'Remove Slide'} onClick={onRemoveSlide}></Button>
                <Button className={styles.button} text={'Add Text'} onClick={onAddText}></Button>
                <Button className={styles.button} text={'Add Image'} onClick={onAddImage}></Button>
                <Button className={styles.button} text={'Remove Text'} onClick={onRemoveText}></Button>
                <Button className={styles.button} text={'Remove Image'} onClick={onRemoveImage}></Button>
                <Button className={styles.button} text={'Change Background'} onClick={onChangeBackground}></Button>
            </div>
        </div>
    )
}

export { ToolBar, };