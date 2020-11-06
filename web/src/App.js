import React from 'react';

import 'bulma/css/bulma.css'
import './App.css';

import Body from './components/landing';
import ScrollToTopButton from './components/ScrollToTop';

const App = () => (
  <div className="wrapper has-background-light">
    <div className="container">
      <Body />

      <ScrollToTopButton />
    </div>
  </div>
);


export default App;
