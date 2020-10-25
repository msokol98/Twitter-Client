import React from 'react';

import 'bulma/css/bulma.css'
import './App.css';

import Landing from './components/landing';

function App() {

  return (
    <div className="wrapper has-background-light">
      <div className="container">

        <Landing />

      </div>
    </div>
  );
}

export default App;
