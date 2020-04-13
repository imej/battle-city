import { 
  DIRECTION,
  LOWEST_POSITION,
  LONGEST_POSITION, 
  COLOR,
  TANK_RADIUS
} from '../utils/Constants';
import {
  TANK_UP_REF, 
  TANK_DOWN_REF, 
  TANK_LEFT_REF, 
  TANK_RIGHT_REF
} from './ImagesCache';
import Bullet from './Bullet';
import { getTankGunPosition } from '../utils/Helper';

class Tank {
  constructor({speed, position, onDie}) {
    this.position = position;
    this.speed = speed;
    this.radius = TANK_RADIUS;
    this.direction = DIRECTION.UP;
    this.ref = TANK_UP_REF.current;
    this.delete = false;
    this.lastShot = 0;
    this.bullets = [];
    this.onDie = onDie;
  }

  die() {
    this.onDie();
  }

  update(keys) {
    if (keys.up) {
      this.direction = DIRECTION.UP;
      this.ref = TANK_UP_REF.current;
      this.position.y = this.position.y - this.speed; 
      if (this.position.y < 0) {
        this.position.y = 0;
      }
    } else if (keys.down) {
      this.direction = DIRECTION.DOWN;
      this.ref = TANK_DOWN_REF.current;
      this.position.y = this.position.y + this.speed;
      if (this.position.y > LOWEST_POSITION) {
        this.position.y = LOWEST_POSITION;
      }
    } else if (keys.left) {
      this.direction = DIRECTION.LEFT;
      this.ref = TANK_LEFT_REF.current;
      this.position.x = this.position.x - this.speed;
      if (this.position.x < 0) {
        this.position.x = 0;
      }
    } else if (keys.right) {
      this.direction = DIRECTION.RIGHT;
      this.ref = TANK_RIGHT_REF.current;
      this.position.x = this.position.x + this.speed;
      if (this.position.x > LONGEST_POSITION) {
        this.position.x = LONGEST_POSITION;
      }
    }

    if (keys.space && Date.now() - this.lastShot > 1000) {
      const bullet = new Bullet({
        radius: 2,
        speed: 2,
        position: getTankGunPosition(this),
        direction: this.direction,
        color: COLOR.YELLOW
      });

      this.bullets.push(bullet);
      this.lastShot = Date.now();
    }
  }

  renderBullets(state) {
    let newBullets = [];
    for (let b of this.bullets) {
      if (!b.delete) {
        b.update();
        b.render(state);
        newBullets.push(b);
      }
    }
    this.bullets = newBullets;
  }

  render(state) {
    const context = state.context;
    
    context.drawImage(this.ref, this.position.x, this.position.y);

    this.renderBullets(state);
  }
}

export default Tank;