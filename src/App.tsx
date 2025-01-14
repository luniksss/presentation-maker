import { useEffect } from 'react'
import { HistoryType } from './utils/history'
import { HistoryContext } from './view/hooks/historyContext'
import { useAppActions } from './view/hooks/useAppActions'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditorView from './components/Editor'
import PlayerView from './components/PlayerView'
import MainPage from './view/MainPage/MainPage'
import { EDITOR_ROUTE, KEYDOWN_KEY, MAC, MAINPAGE_ROUTE, PLAYERVIEW_ROUTE, REDO_HOTKEY_ENGLISH, REDO_HOTKEY_RUSSIAN, UNDO_HOTKEY_ENGLISH, UNDO_HOTKEY_RUSSIAN } from './consts'

type AppProps = {
  history: HistoryType,
}

const App = ({ history }: AppProps) => {
  const { setEditor } = useAppActions()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf(MAC) >= 0
      const isCommand = isMac ? event.metaKey : event.ctrlKey

      if (isCommand) {
        switch (event.key) {
          case UNDO_HOTKEY_ENGLISH:
          case UNDO_HOTKEY_RUSSIAN:
            event.preventDefault()
            const undoneState = history.undo()
            if (undoneState) {
              setEditor(undoneState)
            }
            break
          case REDO_HOTKEY_ENGLISH:
          case REDO_HOTKEY_RUSSIAN:
            event.preventDefault()
            const redoneState = history.redo()
            if (redoneState) {
              setEditor(redoneState)
            }
            break;
        }
      }
    };

    window.addEventListener(KEYDOWN_KEY, handleKeyDown)
    return () => {
      window.removeEventListener(KEYDOWN_KEY, handleKeyDown)
    }
  }, [history, setEditor])

  return (
    <BrowserRouter>
      <HistoryContext.Provider value={history}>
        <Routes>
          <Route path={MAINPAGE_ROUTE} element={<MainPage />} />
          <Route path={EDITOR_ROUTE} element={<EditorView />} />
          <Route path={PLAYERVIEW_ROUTE} element={<PlayerView />} />
        </Routes>
      </HistoryContext.Provider>
    </BrowserRouter>
  )
}

export default App;
