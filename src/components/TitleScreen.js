import React, { Component } from 'react';
import './TitleScreen.css';

class TitleScreen extends Component {
  
  render() {
    return (
      <div>
        <span className="centerScreen title">Battle City</span>
        <span className="centerScreen pressSpace">Press Enter to start the game!</span>
      </div>
    );
  }  
}

export default TitleScreen;