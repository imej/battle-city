import { DIRECTION, LOWEST_POSITION, LONGEST_POSITION } from './Constants';

const getDistanceOfTwoPositions = (po1, po2) => {
  const vx = po1.x - po2.x;
  const vy = po1.y - po2.y;
  return Math.sqrt(vx * vx + vy * vy);
}

const isTwoObjectsTouch = (obj1, obj2) => {
  const po1 = obj1.position;
  const po2 = obj2.position;
  const distance = getDistanceOfTwoPositions(po1, po2);
  return distance < obj1.radius + obj2.radius;
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

const isCrashed = (obj1, obj2) => isTwoObjectsTouch(obj1, obj2) && isTwoObjectsGettingCloser(obj1, obj2);

export {
  isCrashed
};