import { BLOCK_SIZE, BLOCK_TYPE } from '../utils/Constants';
import Brick from './Brick';
import Steel from './Steel';

class Map {
  constructor() {
    this.items = [];

    this.round1();
  }

  round1() {
    // brick walls
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 50, y: 50}, 2, 10));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 150, y: 50}, 2, 10));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 250, y: 50}, 2, 8));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 350, y: 50}, 2, 8));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 450, y: 50}, 2, 10));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 550, y: 50}, 2, 10));

    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 250, y: 300}, 2, 2));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 350, y: 300}, 2, 2));

    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 100, y: 350}, 4, 2));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 450, y: 350}, 4, 2));

    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 250, y: 400}, 2, 7));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 350, y: 400}, 2, 7));
    
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 300, y: 425}, 2, 2));

    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 50, y: 450}, 2, 8));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 150, y: 450}, 2, 8));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 450, y: 450}, 2, 8));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 550, y: 450}, 2, 8));

    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 50, y: 450}, 2, 8));

    // steel walls
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, {x: 300, y: 175}, 2, 2));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, {x: 0, y: 375}, 2, 1));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, {x: 600, y: 375}, 2, 1));

    // headquarter
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 275, y: 625}, 1, 3)); 
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 350, y: 625}, 1, 3));
    this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, {x: 300, y: 625}, 2, 1));
  }

  /**
   * Build a vertical wall with bricks.
   * 
   * @param {*} startPosition: the upper left corner 
   * @param {*} thinkness: 1 - one brick; 2 - two bricks ...
   * @param {*} length: 1 - one brick; 2 - two bricks ... 
   */
  buildWall(blockType, startPosition, thinkness, length) {
    const wall = [];

    for (let i=0;i<thinkness;i++) {
      let x = startPosition.x + BLOCK_SIZE * i;
      for (let j=0;j<length;j++) {
        let y = startPosition.y + BLOCK_SIZE * j;
        switch(blockType) {
          case BLOCK_TYPE.BRICK:
            wall.push(new Brick({ position: { x, y }}));
            break;
          case BLOCK_TYPE.STEEL:
            wall.push(new Steel({ position: { x, y }}));
            break;
          default:

        }
        
      }
    }

    return wall;
  }

  update() {
    let newItems = [];
    for (let i=0;i<this.items.length;i++) {
      let item = this.items[i];
      if (!item.delete) {
        newItems.push(item);
      }
    }

    this.items = newItems;
  }

  render(state) {
    this.items.forEach(item => item.render(state));
  }
}

export default Map;