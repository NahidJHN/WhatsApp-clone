import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {StateProvider} from "./stateProvider/stateProvider"
import reducer from "./stateProvider/reducer"
import {initialState} from "./stateProvider/reducer"


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
      </StateProvider>
    </React.StrictMode>
  </BrowserRouter>,

  document.getElementById('root')
);


