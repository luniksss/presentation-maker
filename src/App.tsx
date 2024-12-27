import { useEffect } from 'react';
import { HistoryType } from './utils/history';
import { HistoryContext } from './view/hooks/historyContext';
import { useAppActions } from './view/hooks/useAppActions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorView from './components/Editor';
import PlayerView from './components/PlayerView';

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
    <BrowserRouter>
      <HistoryContext.Provider value={history}>
        <Routes>
          <Route path="/" element={<EditorView />} />

          <Route path="/player" element={<PlayerView />} />
        </Routes>
      </HistoryContext.Provider>
    </BrowserRouter>
  );
}

export default App;
