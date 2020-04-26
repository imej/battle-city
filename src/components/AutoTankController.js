import AutoTank from './AutoTank';
import { 
  SCREEN_WIDTH, 
  TANK_SIZE,
  AUTO_TANK_SPEED
} from '../utils/Constants';

const MAX_COUNT = 20; // The maximum number of tanks will be generated.
const PRODUCING_FREQUENCY = 5000; // The ms between each tank appears
const STARTING_POSITION = [
  { x: SCREEN_WIDTH / 2 - TANK_SIZE / 2, y: 0 }, // center
  { x: SCREEN_WIDTH - TANK_SIZE, y: 0 }, // right
  { x: 0, y: 0 } // left
];

class AutoTankController {
  constructor({ onAllDie, map, tank, eagle }) {
    this.autoTanks = [];
    this.count = 0;
    this.lastProduction = 0;
    this.allDie = onAllDie;
    this.map = map;
    this.tank = tank;
    this.eagle = eagle;
  }

  checkAllDie() {
    if (this.count >= MAX_COUNT && this.autoTanks.length === 0) {
      this.allDie();
    }
  }

  canProduce() {
    return this.count < MAX_COUNT
           && Date.now() - this.lastProduction > PRODUCING_FREQUENCY
  }

  produce() {
    if (!this.canProduce()) {
      return;
    }

    const nextPosition = STARTING_POSITION[this.count % 3];

    const newTank = new AutoTank({
      speed: AUTO_TANK_SPEED, 
      position: { x: nextPosition.x, y: nextPosition.y }
    });

    this.autoTanks.push(newTank);

    this.count++;
    this.lastProduction = Date.now();
  }

  update() {
    this.checkAllDie();
    this.produce();
    let newTanks = [];
    for(let i=0;i<this.autoTanks.length;i++) {
      let currentTank = this.autoTanks[i];
      if (!currentTank.delete) {
        newTanks.push(currentTank);
        
        currentTank.update(this.map, this.tank, this.eagle);
      }
    }

    this.autoTanks = newTanks;
  }

  render(state) {
    this.autoTanks.forEach(t => t.render(state));
  }
}

export default AutoTankController;