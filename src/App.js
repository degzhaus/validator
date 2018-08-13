import React, { Component } from 'react'
import SimpleStorage from './state/SimpleStorage'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <SimpleStorage />
      </div>
    );
  }
}

export default App
