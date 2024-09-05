import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#00695f',
      main: '#009688',
      dark: '#33ab9f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#357f78',
      main: '#4db6ac',
      dark: '#70c4bc',
      contrastText: '#000',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


reportWebVitals();
