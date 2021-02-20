import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./store";
import thunk from 'redux-thunk';
import { BrowserRouter} from "react-router-dom";
import { SnackbarProvider } from "notistack";

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
               <BrowserRouter>
                    <App/>
               </BrowserRouter>
          </SnackbarProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
