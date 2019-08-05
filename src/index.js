import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.css';

import AppContainer from './AppContainer';
import configureStore from './services/store/configure';

const store = configureStore;

ReactDOM.render(
    <Provider store={store}>
        <div>
            <AppContainer />
            <ReduxToastr
                preventDuplicates
                progressBar
                position="bottom-right" />
        </div>
    </Provider>,
    document.getElementById('root')
);
