import {SCREEN_WIDTH, SCREEN_HEIGHT, RATIO} from '../utils/Constants';
import {TANK_UP_REF, TANK_DOWN_REF, TANK_LEFT_REF, TANK_RIGHT_REF, TANK_SIZE} from './ImagesCache';

const LOWEST_POSITION = SCREEN_HEIGHT - TANK_SIZE;
const LONGEST_POSITION = SCREEN_WIDTH - TANK_SIZE;

class Tank {
  constructor({radius, speed, position}) {
    this.position = position;
    this.speed = speed;
    this.radius = radius;
    this.ref = TANK_UP_REF.current;
  }

  update(keys) {
    if (keys.up) {
      this.ref = TANK_UP_REF.current;
      this.position.y = this.position.y - this.speed; 
      if (this.position.y < 0) {
        this.position.y = 0;
      }
    } else if (keys.down) {
      this.ref = TANK_DOWN_REF.current;
      this.position.y = this.position.y + this.speed;
      if (this.position.y > LOWEST_POSITION) {
        this.position.y = LOWEST_POSITION;
      }
    } else if (keys.left) {
      this.ref = TANK_LEFT_REF.current;
      this.position.x = this.position.x - this.speed;
      if (this.position.x < 0) {
        this.position.x = 0;
      }
    } else if (keys.right) {
      this.ref = TANK_RIGHT_REF.current;
      this.position.x = this.position.x + this.speed;
      if (this.position.x > LONGEST_POSITION) {
        this.position.x = LONGEST_POSITION;
      }
    }
  }

  render(state) {
    const context = state.context;
    
    context.drawImage(this.ref, this.position.x, this.position.y);
  }
}

export default Tank;