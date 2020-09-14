import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';
import localization from 'moment/locale/es';

import Router from './components/router';
import * as serviceWorker from './serviceWorker';
import theme from './assets/styles/muiTheme';
import store from './redux/store';
import AgroMatchSentry from './utils/sentry'; // eslint-disable-line

import './assets/styles/index.css';

moment.updateLocale('es', localization);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
