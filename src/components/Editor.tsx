import React from 'react'
import styles from '../App.module.css'
import { ToolBar } from '../view/ToolBar/ToolBar'
import { SlideList } from '../view/SlideList/SlideList'
import { WorkSpace } from '../view/WorkSpace/WorkSpace'

const EditorView: React.FC = () => {
    return (
        <>
            <ToolBar />
            <div className={styles.container}>
                <SlideList />
                <WorkSpace />
            </div>
        </>
    );
}

export default EditorView