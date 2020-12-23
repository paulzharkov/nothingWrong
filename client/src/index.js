import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

