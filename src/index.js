import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './components/App/App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6dbf6e',
    },
    secondary: {
      main: '#fbfbfb',
    },
  },
});



ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('react-root'),
);
