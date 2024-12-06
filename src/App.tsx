import styles from './App.module.css';
import { ToolBar } from './view/ToolBar/ToolBar';
import { WorkSpace } from './view/WorkSpace/WorkSpace';
import { SlideList } from './view/SlideList/SlideList';
import { HistoryType } from './utils/history';
import { HistoryContext } from './view/hooks/historyContext';

type AppProps = {
  history: HistoryType,
}

function App({history}: AppProps) {
  return (
    <HistoryContext.Provider value={history}>
      <ToolBar></ToolBar>
      <div className={styles.container}>
        <SlideList></SlideList>
        <WorkSpace></WorkSpace>
      </div>
    </HistoryContext.Provider>
  );
}

export default App;
