import { 
  DIRECTION, 
  LOWEST_POSITION, 
  LONGEST_POSITION,
  TANK_SIZE, 
  BULLET_SIZE
} from './Constants';

const isRectanglesCrashed = (rect1, rect2) =>
  rect1.x < rect2.x + rect2.width &&
  rect1.x + rect1.width > rect2.x &&
  rect1.y < rect2.y + rect2.height &&
  rect1.y + rect1.height > rect2.y;

const isTankTankCrashed = (tank1, tank2) => 
  isRectanglesCrashed({x: tank1.position.x, y: tank1.position.y, width: TANK_SIZE, height: TANK_SIZE},
    {x: tank2.position.x, y: tank2.position.y, width: TANK_SIZE, height: TANK_SIZE});

const isBulletTankCrashed = (bullet, tank) => 
  isRectanglesCrashed({x: bullet.position.x, y: bullet.position.y, width: BULLET_SIZE, height: BULLET_SIZE},
    {x: tank.position.x, y: tank.position.y, width: TANK_SIZE, height: TANK_SIZE});

const getDistanceOfTwoPositions = (po1, po2) => {
  const vx = po1.x - po2.x;
  const vy = po1.y - po2.y;
  return Math.sqrt(vx * vx + vy * vy);
}

/**
 * Based on the current position and going direction of an object, 
 * return its next position. 
 */
const getFuturePosition = obj => {
  const newPosition = {
    x: obj.position.x,
    y: obj.position.y
  };

  switch(obj.direction) {
    case DIRECTION.UP:
      newPosition.y = newPosition.y > 0 ? newPosition.y - 1 : newPosition.y;
      break;
    case DIRECTION.DOWN:
      newPosition.y = newPosition.y < LOWEST_POSITION ? newPosition.y + 1 : newPosition.y;
      break;
    case DIRECTION.LEFT:
      newPosition.x = newPosition.x > 0 ? newPosition.x - 1 : newPosition.x;
      break;
    case DIRECTION.RIGHT:
      newPosition.x = newPosition.x < LONGEST_POSITION ? newPosition.x + 1 : newPosition.x; 
      break;
    default:
      // obj not moving.
  }

  return newPosition;
}

const isTwoObjectsGettingCloser = (obj1, obj2) => {
  const currentPo1 = obj1.position;
  const currentPo2 = obj2.position;
  const currentDistance = getDistanceOfTwoPositions(currentPo1, currentPo2);

  const futurePo1 = getFuturePosition(obj1);
  const futurePo2 = getFuturePosition(obj2);
  const futureDistance = getDistanceOfTwoPositions(futurePo1, futurePo2);

  return currentDistance > futureDistance;
}

const getTankGunPosition = tank => {
  let x, y;

  switch(tank.direction) {
    case DIRECTION.UP:
      x = tank.position.x + TANK_SIZE/2;
      y = tank.position.y;
      break;
    case DIRECTION.DOWN:
      x = tank.position.x + TANK_SIZE/2;
      y = tank.position.y + TANK_SIZE;
      break;
    case DIRECTION.LEFT:
      x = tank.position.x;
      y = tank.position.y + TANK_SIZE/2;
      break;
    case DIRECTION.RIGHT:
      x = tank.position.x + TANK_SIZE;
      y = tank.position.y + TANK_SIZE/2;
      break;
    default:
      x = 0;
      y = 0;           
  }

  return {x, y};
}
export {
  getTankGunPosition,
  isBulletTankCrashed
};