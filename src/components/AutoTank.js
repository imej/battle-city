import { 
  SCREEN_WIDTH, 
  SCREEN_HEIGHT, 
  DIRECTION, 
  TANK_SIZE,
  TANK_RADIUS,
  COLOR
} from '../utils/Constants';
import {
  AUTO_TANK_UP_REF, 
  AUTO_TANK_DOWN_REF, 
  AUTO_TANK_LEFT_REF, 
  AUTO_TANK_RIGHT_REF
} from './ImagesCache';
import Bullet from './Bullet';
import { getTankGunPosition } from '../utils/Helper';

class AutoTank {
  constructor({speed, position}) {
    this.position = position;
    this.speed = speed;
    this.radius = TANK_RADIUS;
    this.direction = DIRECTION.UP;
    this.ref =   AUTO_TANK_UP_REF.current;
    this.delete = false;
    this.lastTurn = 0;  // the time when this tank last makes a turn.
    this.lastShot = 0;
    this.bullets = [];
    this.blocked = false;
  }

  die() {
    this.delete = true;
  }

  isAtEdge() {
    return this.direction === DIRECTION.UP && this.position.y <= TANK_SIZE / 2
           || this.direction === DIRECTION.DOWN && this.position.y + TANK_SIZE / 2 >= SCREEN_HEIGHT
           || this.direction === DIRECTION.LEFT && this.position.x <= TANK_SIZE / 2
           || this.direction === DIRECTION.RIGHT && this.position.x + TANK_SIZE / 2 >= SCREEN_WIDTH;
  }

  /**
   * It is allowed to move on the same direction for 4 sec
   */
  canGoforward() {
    return !this.blocked && !this.isAtEdge() && (Date.now() - this.lastTurn < 4000);
  }

  getDirection() {
    if (this.canGoforward()) {
      return this.direction;
    }

    let newDirection;
    const random = Math.floor(Math.random() * 21);
    switch(random % 4) {
      case 0:
        newDirection = DIRECTION.UP;
        break;
      case 1: 
        newDirection = DIRECTION.LEFT;
        break;
      case 2: 
        newDirection = DIRECTION.RIGHT;
        break;
      default:
        newDirection = DIRECTION.DOWN;
    }
    
    this.lastTurn = Date.now();
    return newDirection;
  }

  shoot() {
    if (Date.now() - this.lastShot > 5000) {
      const bullet = new Bullet({
        radius: 2,
        speed: 1.5,
        position: getTankGunPosition(this),
        direction: this.direction,
        color: COLOR.WHITE
      });
      this.bullets.push(bullet);
      this.lastShot = Date.now();
    }
  }

  update() {
    this.shoot();
    this.direction = this.getDirection();

    switch(this.direction) {
      case DIRECTION.UP:
        this.ref = AUTO_TANK_UP_REF.current;
        this.position.y -= this.speed;
        break;
      case DIRECTION.DOWN:
        this.ref = AUTO_TANK_DOWN_REF.current;
        this.position.y += this.speed;
        break;
      case DIRECTION.LEFT:
        this.ref = AUTO_TANK_LEFT_REF.current;
        this.position.x -= this.speed;
        break;
      case DIRECTION.RIGHT:
        this.ref = AUTO_TANK_RIGHT_REF.current;
        this.position.x += this.speed;
        break;
      default:

    }

    this.blocked = false;
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
    
    context.drawImage(this.ref, this.position.x - TANK_SIZE / 2, this.position.y - TANK_SIZE / 2);

    this.renderBullets(state);
  }

}

export default AutoTank;