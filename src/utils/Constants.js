export const SCREEN_WIDTH = 800;

export const SCREEN_HEIGHT = 800;

export const RATIO = window.devicePixelRatio || 1;

export const TANK_SIZE = 50;

export const TANK_RADIUS = Math.round(Math.sqrt(50 * 50 * 2) / 2); 

export const LOWEST_POSITION = SCREEN_HEIGHT - TANK_SIZE;

export const LONGEST_POSITION = SCREEN_WIDTH - TANK_SIZE;

export const DIRECTION = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
};

export const COLOR = {
  WHITE: '#fff',
  YELLOW: '#ff0'
}