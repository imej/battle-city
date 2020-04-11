import { 
  DIRECTION,
  LOWEST_POSITION,
  LONGEST_POSITION, 
  TANK_SIZE
} from '../utils/Constants';
import {
  TANK_UP_REF, 
  TANK_DOWN_REF, 
  TANK_LEFT_REF, 
  TANK_RIGHT_REF
} from './ImagesCache';
import Bullet from './Bullet';

class Tank {
  constructor({radius, speed, position}) {
    this.position = position;
    this.speed = speed;
    this.radius = radius;
    this.direction = DIRECTION.UP;
    this.ref = TANK_UP_REF.current;
    this.delete = false;
    this.lastShot = 0;
    this.bullets = [];
  }

  die() {
    // this.onDie();
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
        speed: 3.5,
        position: this.getGunPosition(),
        direction: this.direction
      });

      this.bullets.push(bullet);
      this.lastShot = Date.now();
    }
  }

  getGunPosition() {
    let x, y;

    switch(this.direction) {
      case DIRECTION.UP:
        x = this.position.x + Math.round(TANK_SIZE / 2);
        y = this.position.y;
        break;
      case DIRECTION.DOWN:
        x = this.position.x + Math.round(TANK_SIZE / 2);
        y = this.position.y + TANK_SIZE;
        break;
      case DIRECTION.LEFT:
        x = this.position.x;
        y = this.position.y + Math.round(TANK_SIZE / 2);
        break;
      case DIRECTION.RIGHT:
        x = this.position.x + TANK_SIZE;
        y = this.position.y + Math.round(TANK_SIZE / 2);
        break;
      default:
        x = 0;
        y = 0;           
    }

    return {x, y};
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