import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppContainer from './containers/AppContainer';
import appConfig from './config';

document.title = appConfig.app_name;
const rootElement = document.getElementById('cvid-tracker-main')
ReactDOM.render(<AppContainer />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
