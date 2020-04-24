import { 
  DIRECTION, 
  TANK_SIZE, 
  BULLET_SIZE,
  BLOCK_SIZE
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

const isTankBlockCrashed = (tank, block) => 
  isRectanglesCrashed({x: tank.position.x, y: tank.position.y, width: TANK_SIZE, height: TANK_SIZE},
    {x: block.position.x, y: block.position.y, width: BLOCK_SIZE, height: BLOCK_SIZE});

const isBulletBlockCrashed = (bullet, block) => 
  isRectanglesCrashed({x: bullet.position.x, y: bullet.position.y, width: BULLET_SIZE, height: BULLET_SIZE},
    {x: block.position.x, y: block.position.y, width: BLOCK_SIZE, height: BLOCK_SIZE});    

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

const isTankBlocked = (tank, map) => {
  if (!map || !map.items || map.items.length === 0) {
    return false;
  }

  return map.items.some(block => isTankBlockCrashed(tank, block));
}

export {
  getTankGunPosition,
  isBulletTankCrashed,
  isTankTankCrashed,
  isBulletBlockCrashed,
  isTankBlocked
};