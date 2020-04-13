import { DIRECTION } from '../utils/Constants';

const WHITE = '#fff';
const YELLOW = '#ff0';

class Bullet {
  constructor({radius, speed, position, direction, color}) {
    this.position = position;
    this.speed = speed;
    this.radius = radius;
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
    context.lineWidth = 0.5;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}

export default Bullet;