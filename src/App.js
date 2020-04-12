import React, { Component } from 'react';
import './App.css';
import { SCREEN_WIDTH, SCREEN_HEIGHT, RATIO, TANK_SIZE} from './utils/Constants';
import InputManager from './utils/InputManager';
import TitleScreen from './components/TitleScreen';
import Tank from './components/Tank';
import ImagesCache from './components/ImagesCache';
import AutoTankController from './components/AutoTankController';
import { isTwoObjectsTouch } from './utils/Helper';

const GAME_STATE = {
  START_SCREEN: 0,
  PLAYING: 1,
  GAME_OVER: 2
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: new InputManager(),

      screen: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        ratio: RATIO
      },

      gameState: GAME_STATE.START_SCREEN,

      context: null,

      score: 0
    };

    this.canvas = React.createRef();
    
    this.tank1 = null;
    this.tank2 = null;

    this.autoTankController = new AutoTankController();
  }

  componentDidMount() {
    this.state.input.bindKeys();
    const context = this.canvas.current.getContext('2d');
    this.setState({ context: context });
    requestAnimationFrame(() => this.update());
  }

  componentWillUnmount() {
    this.state.input.unbindKeys();
  }

  update() {
    const keys = this.state.input.pressedKeys;

    switch(this.state.gameState) {
      case GAME_STATE.START_SCREEN:
        if (keys.enter) {
          this.startGame();
        }
        break;
      
      case GAME_STATE.PLAYING:
        this.clearBackground();

        if (this.tank1) {
          this.checkCollision();
          this.tank1.update(keys);
          this.tank1.render(this.state);
        }

        this.autoTankController.update();
        this.autoTankController.render(this.state);

        break;
      
      case GAME_STATE.GAME_OVER:
        break;  
    }

    requestAnimationFrame(() => this.update());
  }

  startGame() {
    this.tank1 = new Tank({
      radius: 70,
      speed: 2.5,
      position: {
        x: this.state.screen.width/2 - TANK_SIZE - 100,
        y: this.state.screen.height - TANK_SIZE 
      }
    });

    this.setState({
      gameState: GAME_STATE.PLAYING,
      score: 0
    });
  }

  clearBackground() {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;
  }

  checkCollision() {

    // bullets of tank1 kills autotanks
    for(let b of this.tank1.bullets) {
      if (b.delete) continue;
      for(let a of this.autoTankController.autoTanks) {
        if (isTwoObjectsTouch(b, a)) {
          b.die();
          a.die();
        }
      }
    }
  }

  render() {
    return (
      <div>
        <ImagesCache />

        { this.state.gameState === GAME_STATE.START_SCREEN && <TitleScreen /> }

        <canvas ref={this.canvas}
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />  
      </div>
    );
  }
  
}

export default App;
