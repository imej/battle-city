import { DIRECTION, BULLET_SIZE } from '../utils/Constants';

class Bullet {
  constructor({speed, position, direction, color}) {
    this.position = position;
    this.speed = speed;
    this.delete = false;
    this.direction = direction;
    this.color = color;
  }

  die() {
    this.delete = true;
  }

  update() {
    switch(this.direction) {
      case DIRECTION.UP:
        this.position.y -= this.speed;
        break;
      case DIRECTION.DOWN:
        this.position.y += this.speed;
        break;
      case DIRECTION.LEFT:
        this.position.x -= this.speed;
        break;
      case DIRECTION.RIGHT:
        this.position.x += this.speed;
        break;
      default:

    }
  }

  render(state) {
    if (this.position.x > state.screen.width || this.position.x < 0
      || this.position.y > state.screen.height || this.position.y < 0 ) {
      this.die();
    }

    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.fillStyle = this.color;
    context.beginPath();
    context.rect(0, 0, BULLET_SIZE, BULLET_SIZE);
    context.fill();
    context.restore();
  }
}

export default Bullet;