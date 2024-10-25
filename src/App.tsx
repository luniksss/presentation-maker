import styles from './App.module.css';
import { ToolBar } from './view/ToolBar/ToolBar';
import { WorkSpace } from './view/WorkSpace/WorkSpace';
import { SlideList } from './view/SlideList/SlideList';
import { Editor } from './store/EditorType';
import { SlideType } from './store/PresentationType';

type AppProps = {
  editor: Editor,
}

function App({editor}: AppProps) {
  const selectedSlide = editor.presentation.slides.find(slide => slide.id === editor.selection.slideId) as SlideType;
  const selectedElementId = editor.selection.elementId;
  return (
    <>
      <ToolBar title={editor.presentation.title}></ToolBar>
      <div className={styles.container}>
        <SlideList slides={editor.presentation.slides} selection={editor.selection}></SlideList>
        <WorkSpace slide={selectedSlide} selectedElementId={selectedElementId}></WorkSpace>
      </div>
    </>
  );
}

export default App;
