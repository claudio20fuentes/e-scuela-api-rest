import React, { Suspense, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './redux/Store';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import Spinner from './views/spinner/Spinner';
import { environment } from './config/variables';

import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');

createRoot(root).render(
  <Provider store={configureStore()}>
    <Suspense fallback={<Spinner />}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </Provider>
);

serviceWorker.unregister();

reportWebVitals();
