import AutoTank from './AutoTank';
import { SCREEN_WIDTH, TANK_SIZE } from '../utils/Constants';

const MAX_COUNT = 20; // The maximum number of tanks will be generated.
const PRODUCING_FREQUENCY = 5000; // The ms between each tank appears
const STARTING_POSITION = {
  x: Math.floor(SCREEN_WIDTH / 2 - TANK_SIZE / 2),
  y: 0
};

class AutoTankController {
  constructor() {
    this.autoTanks = [];
    this.count = 0;
    this.lastProduction = 0;
  }

  canProduce() {
    return this.count < MAX_COUNT
           && Date.now() - this.lastProduction > PRODUCING_FREQUENCY
  }

  produce() {
    if (!this.canProduce()) {
      return;
    }

    const newTank = new AutoTank({
      speed: 0.5, 
      position: { x: STARTING_POSITION.x, y: STARTING_POSITION.y }
    });

    this.autoTanks.push(newTank);

    this.count++;
    this.lastProduction = Date.now();
  }

  update() {
    this.produce();
    let newTanks = [];
    for(let autoTank of this.autoTanks) {
      if (!autoTank.delete) {
        newTanks.push(autoTank);
        autoTank.update();
      }
    }

    this.autoTanks = newTanks;
  }

  render(state) {
    this.autoTanks.forEach(t => t.render(state));
  }
}

export default AutoTankController;