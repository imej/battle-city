import { 
  DIRECTION, 
  COLOR,
  LOWEST_POSITION,
  LONGEST_POSITION
} from '../utils/Constants';
import {
  AUTO_TANK_UP_REF, 
  AUTO_TANK_DOWN_REF, 
  AUTO_TANK_LEFT_REF, 
  AUTO_TANK_RIGHT_REF
} from './ImagesCache';
import Bullet from './Bullet';
import { 
  getTankGunPosition,
  isTankBlocked,
  isBulletBlockCrashed,
  isBulletTankCrashed,
  isTankTankCrashed
} from '../utils/Helper';

class AutoTank {
  constructor({speed, position}) {
    this.position = position;
    this.speed = speed;
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
    if (this.direction === DIRECTION.UP && this.position.y <= 0) {
      return true;
    } else if (this.direction === DIRECTION.DOWN && this.position.y >= LOWEST_POSITION) {
      return true;
    } else if (this.direction === DIRECTION.LEFT && this.position.x <= 0) {
      return true
    } else if (this.direction === DIRECTION.RIGHT && this.position.x >= LONGEST_POSITION) {
      return true;
    }

    return false;
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
    this.blocked = false;
    return newDirection;
  }

  shoot() {
    if (Date.now() - this.lastShot > 5000) {
      const bullet = new Bullet({
        speed: 1.5,
        position: getTankGunPosition(this),
        direction: this.direction,
        color: COLOR.WHITE
      });
      this.bullets.push(bullet);
      this.lastShot = Date.now();
    }
  }

  update(map, tank) {
    this.shoot();
    this.direction = this.getDirection();

    switch(this.direction) {
      case DIRECTION.UP:
        this.ref = AUTO_TANK_UP_REF.current;
        this.position.y -= this.speed;
        if (isTankBlocked(this, map)) {
          this.position.y += this.speed;
          this.blocked = true;
        }
        break;
      case DIRECTION.DOWN:
        this.ref = AUTO_TANK_DOWN_REF.current;
        this.position.y += this.speed;
        if (isTankBlocked(this, map)) {
          this.position.y -= this.speed;
          this.blocked = true;
        }
        break;
      case DIRECTION.LEFT:
        this.ref = AUTO_TANK_LEFT_REF.current;
        this.position.x -= this.speed;
        if (isTankBlocked(this, map)) {
          this.position.x += this.speed;
          this.blocked = true;
        }
        break;
      case DIRECTION.RIGHT:
        this.ref = AUTO_TANK_RIGHT_REF.current;
        this.position.x += this.speed;
        if (isTankBlocked(this, map)) {
          this.position.x -= this.speed;
          this.blocked = true;
        }
        break;
      default:

    }

    if (isTankTankCrashed(this, tank)) {
      tank.die();
      this.die();
    }

    this.bullets.forEach(b => {
      if (!b.delete && isBulletTankCrashed(b, tank)) {
        b.die();
        tank.die();
      }

      if (!b.delete) {
        map.items.forEach(i => {
          if (isBulletBlockCrashed(b, i)) {
            b.die();
            i.die();
          }
        })
      }
    });
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

export default AutoTank;