import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import 'halfmoon/css/halfmoon-variables.min.css';
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
