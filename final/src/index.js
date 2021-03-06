import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

/*
 | CLAIRE ADDED: this line imports Bootstrap CSS, because it looks like
 | Sofia's navbar.jsx uses raw Bootstrap classes. If we switch to Material UI,
 | we will need to remove this line.
 |
 | If we stick to bootstrap, I would maybe recommend using the premade Navbar
 | Bootstrap React component: https://react-bootstrap.github.io/components/navbar/
 */
import 'bootstrap/dist/css/bootstrap.css';
import 'react-rangeslider/lib/index.css'
import './index.css';

import {BrowserRouter} from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
