import React, { useEffect } from 'react';
import styles from './App.module.css';
import { ToolBar } from './view/ToolBar/ToolBar';
import { WorkSpace } from './view/WorkSpace/WorkSpace';
import { SlideList } from './view/SlideList/SlideList';
import { HistoryType } from './utils/history';
import { HistoryContext } from './view/hooks/historyContext';
import { useAppActions } from './view/hooks/useAppActions';

type AppProps = {
  history: HistoryType,
}

function App({ history }: AppProps) {
  const { setEditor } = useAppActions();
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCommand = isMac ? event.metaKey : event.ctrlKey;

      if (isCommand) {
        switch (event.key) {
          case 'я':
          case 'z':
            event.preventDefault();
            const undoneState = history.undo();
            if (undoneState) {
              setEditor(undoneState);
            }
            break;
          case 'н':
          case 'y':
            event.preventDefault();
            const redoneState = history.redo();
            if (redoneState) {
              setEditor(redoneState);
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [history, setEditor]);

  return (
    <HistoryContext.Provider value={history}>
      <ToolBar />
      <div className={styles.container}>
        <SlideList />
        <WorkSpace />
      </div>
    </HistoryContext.Provider>
  );
}

export default App;
