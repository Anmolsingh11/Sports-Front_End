import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import ReactPwa from "react-pwa-app";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ReactPwa
    test //is to install in localhost, not required
    suspense={<>
      a preloader to load the service worker in the application 
      is the best way to not overload with component calls.
      this ensures that the rest of the application only loads after the sw is checked
      default is children
    </>}
    config={{
      swUrl: "/service-worker.js", // sw file in public default is service-worker.js
      onUpdate: (reg) => {
        console.log("sw cache was updated");
        console.log(reg);
      },
      onSuccess: (reg) => {
        console.log("sw success installed");
        console.log(reg);
      },
      onError: (reg) => {
        console.logs("sw error to install");
        console.log(reg);
      },
      onPrompt:(e) => {
        if(e.outcome === 'accepted'){
          console.log('user click on install and accept')
        }
        if(e.outcome === 'dismissed'){
          console.log('user click on install and refuse')
        }
      },
    }}
  >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ReactPwa>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
