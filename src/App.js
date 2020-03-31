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

  componentDidMount() {
    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context});
    requestAnimationFrame(() => this.update());
  }

  update() {
    this.clearBackground();
  }

  clearBackground() {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;

    const img = new Image();
    img.src = '/images/tank-left.png';
    img.onload = function() {
      context.drawImage(img, 0, 0);
    }
  }

  render () {
    return (
      <div>
        
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />  
      </div>
    );
  }
  
}

export default App;
