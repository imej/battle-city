import React, { Component } from 'react';
import './App.css';
import TitleScreen from './components/TitleScreen';

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 800;
const RATIO = window.devicePixelRatio || 1;

const GameState = {
  StartScreen: 0,
  Playing: 1,
  GameOver: 2
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      screen: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        ratio: RATIO
      },

      gameState: GameState.StartScreen,

      context: null,

      score: 0
    };

  }

  render () {
    return (
      <div>
        { this.state.gameState === GameState.StartScreen && <TitleScreen />}
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />  
      </div>
    );
  }
  
}

export default App;
