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
      {/* <EventListeners /> Add the EventListeners component */}
    </Suspense>
  </Provider>
);


// function EventListeners() {
//   useEffect(() => {
//     if (environment === 'prodssh' || environment === 'local') {
//     const handleKeyDown = (event) => {
//       if (event.ctrlKey) {
//         event.preventDefault();
//       }
//       if (event.keyCode === 123) {
//         event.preventDefault();
//       }
//     };

//     const handleContextMenu = (event) => {
//       event.preventDefault();
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     document.addEventListener('contextmenu', handleContextMenu);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('contextmenu', handleContextMenu);
//     };
//   } else {
//     return ;
//   }
//   }, []);

//   return null;
// }


// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
