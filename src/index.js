import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
// import {createStore, applyMiddleware} from 'redux';
import {createStore} from 'redux';
import { rootReducer } from './redux/reducers';
import { createLogger } from 'redux-logger';

import 'tachyons';

// const logger = createLogger();

// const store = createStore(rootReducer, applyMiddleware(logger));
const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}>
        <App />
    </Provider>
    , 
    document.getElementById('root'));

serviceWorker.register();
