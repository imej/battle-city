import React, { Component } from 'react';
import './App.css';
import { SCREEN_WIDTH, SCREEN_HEIGHT, RATIO, TANK_SIZE} from './utils/Constants';
import InputManager from './utils/InputManager';
import TitleScreen from './components/TitleScreen';
import GameOver from './components/GameOver';
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

    this.autoTankController = new AutoTankController({
      onAllDie: () => this.win()
    });

    this.congras = '';
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
      
      default:
        // do nothing
    }

    requestAnimationFrame(() => this.update());
  }

  startGame() {
    this.tank1 = new Tank({
      speed: 2.5,
      position: {
        x: this.state.screen.width / 2 - TANK_SIZE / 2 - 100,
        y: this.state.screen.height - TANK_SIZE / 2 
      },
      onDie: () => this.lose()
    });

    this.setState({
      gameState: GAME_STATE.PLAYING,
      score: 0
    });
  }

  win() {
    this.congras = 'You won!';
    this.endGame();
  }

  lose() {
    this.congras = 'You lost!'
    this.endGame();
  }

  endGame() {
    this.setState({gameState: GAME_STATE.GAME_OVER});
  }

  clearBackground() {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;
  }

  checkCollision() {

    // bullets of tank1 kill autotanks
    for(let b of this.tank1.bullets) {
      if (b.delete) continue;
      for(let a of this.autoTankController.autoTanks) {
        if (isTwoObjectsTouch(b, a)) {
          b.die();
          a.die();
        }
      }
    }

    // bullets of autotanks kill tank1
    for(let auto of this.autoTankController.autoTanks) {
      if (auto.delete) continue;
      for (let bullet of auto.bullets) {
        if (bullet.delete) continue;
        if (isTwoObjectsTouch(bullet, this.tank1)) {
          bullet.die();
          this.tank1.die();
        }
      }
    }
  }

  render() {
    return (
      <div>
        <ImagesCache />

        { this.state.gameState === GAME_STATE.START_SCREEN && <TitleScreen /> }

        { this.state.gameState === GAME_STATE.GAME_OVER && <GameOver msg={this.congras} /> }

        <canvas ref={this.canvas}
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />  
      </div>
    );
  }
  
}

export default App;
