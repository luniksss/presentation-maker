import styles from './App.module.css';
import { ToolBar } from './view/ToolBar/ToolBar';
import { WorkSpace } from './view/WorkSpace/WorkSpace';
import { SlideList } from './view/SlideList/SlideList';

function App() {
  return (
    <>
      <ToolBar></ToolBar>
      <div className={styles.container}>
        <SlideList></SlideList>
        <WorkSpace></WorkSpace>
      </div>
    </>
  );
}

export default App;
