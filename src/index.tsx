import {StrictMode} from 'react';
import { createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { initHistory } from './utils/history';
import './components/translation/i18next'

const root = createRoot(document.getElementById('root')!)

root.render(
    <StrictMode>
      <Provider store={store}>
        <App history={initHistory(store)}/>
      </Provider>
    </StrictMode>
  )