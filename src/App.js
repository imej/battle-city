import React, { Component } from 'react';
import './App.css';
import { 
  SCREEN_WIDTH, 
  SCREEN_HEIGHT, 
  RATIO, 
  LOWEST_POSITION,
  GAME_STATE,
} from './utils/Constants';
import InputManager from './utils/InputManager';
import TitleScreen from './components/TitleScreen';
import GameOver from './components/TitleScreen/GameOver';
import Tank from './components/Tank';
import ImagesCache from './utils/ImagesCache';
import AutoTankController from './components/Tank/AutoTankController';
import Map from './components/Map';
import Eagle from './components/Eagle';
import TankCount from './components/TankCount';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: new InputManager(),

      gameState: GAME_STATE.START_SCREEN,

      context: null,

      score: 0,

      autoTanksCount: 0,
    };

    this.canvas = React.createRef();

    this.map = null;
    this.eagle = null;
    
    this.tank1 = null;
    this.tank2 = null;

    this.autoTankController = null;

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

        this.map.update();
        this.map.render(this.state);
        this.eagle.render(this.state);

        if (this.tank1) {
          this.tank1.update(keys, this.map, this.autoTankController.autoTanks);
          this.tank1.render(this.state);
        }

        this.autoTankController.update();
        this.autoTankController.render(this.state);
        if (this.autoTankController.count !== this.state.count) {
          this.setState({
            autoTanksCount: this.autoTankController.count
          });
        }

        break;
      
      case GAME_STATE.GAME_OVER:
        break; 
      
      default:
        // do nothing
    }

    requestAnimationFrame(() => this.update());
  }

  startGame() {
    this.map = new Map();
    this.eagle = new Eagle( { onDie: () => this.lose()} );
    
    this.tank1 = new Tank({
      speed: 2.5,
      position: {
        x: SCREEN_WIDTH / 2 - 100,
        y: LOWEST_POSITION
      },
      onDie: () => this.lose()
    });

    this.autoTankController = new AutoTankController({
      count: 20,
      onAllDie: () => this.win(),
      map: this.map,
      tank: this.tank1,
      eagle: this.eagle
    });

    this.setState({
      gameState: GAME_STATE.PLAYING,
      score: 0,
      autoTanksCount: 20
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
    context.scale(RATIO, RATIO);
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.globalAlpha = 1;
  }

  render() {
    return (
      <div className="container">
        <ImagesCache />

        { this.state.gameState === GAME_STATE.START_SCREEN && <TitleScreen /> }

        { this.state.gameState === GAME_STATE.GAME_OVER && <GameOver msg={this.congras} /> }

        <canvas ref={this.canvas}
          width={SCREEN_WIDTH * RATIO}
          height={SCREEN_HEIGHT * RATIO}
        />

        { this.state.gameState === GAME_STATE.PLAYING && <TankCount count={this.state.autoTanksCount} />  } 
      </div>
    );
  }
  
}

export default App;
