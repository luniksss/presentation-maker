import {StrictMode} from 'react';
import { createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { addEditorChangeHandler, getEditor } from './store/editor';

const container = document.getElementById('root')!;
const root = createRoot(container);

function render() {
  root.render(
    <StrictMode>
      <App editor={getEditor()}/>
    </StrictMode>
  )
}

addEditorChangeHandler(render)
render()