import React from 'react';

const TANK_UP = "/images/tank-up.png";
const TANK_DOWN = "/images/tank-down.png";
const TANK_LEFT = "/images/tank-left.png";
const TANK_RIGHT = "/images/tank-right.png";
const AUTO_TANK_UP = "/images/auto-tank-up.png";
const AUTO_TANK_DOWN = "/images/auto-tank-down.png";
const AUTO_TANK_LEFT = "/images/auto-tank-left.png";
const AUTO_TANK_RIGHT = "/images/auto-tank-right.png";
const BRICK = "/images/brick.png";
const STEEL = "/images/steel.png";
const EAGLE = "/images/eagle.png";

export const TANK_UP_REF = React.createRef();
export const TANK_DOWN_REF = React.createRef();
export const TANK_LEFT_REF = React.createRef();
export const TANK_RIGHT_REF = React.createRef();
export const AUTO_TANK_UP_REF = React.createRef();
export const AUTO_TANK_DOWN_REF = React.createRef();
export const AUTO_TANK_LEFT_REF = React.createRef();
export const AUTO_TANK_RIGHT_REF = React.createRef();
export const BRICK_REF = React.createRef();
export const STEEL_REF = React.createRef();
export const EAGLE_REF = React.createRef();

function ImagesCache() {
  return (
    <div>
      <img ref={TANK_UP_REF} src={TANK_UP} alt="tank up" style={{width:0, height:0}} />
      <img ref={TANK_DOWN_REF} src={TANK_DOWN} alt="tank up" style={{width:0, height:0}} />
      <img ref={TANK_LEFT_REF} src={TANK_LEFT} alt="tank up" style={{width:0, height:0}} />
      <img ref={TANK_RIGHT_REF} src={TANK_RIGHT} alt="tank up" style={{width:0, height:0}} />
      <img ref={AUTO_TANK_UP_REF} src={AUTO_TANK_UP} alt="tank up" style={{width:0, height:0}} />
      <img ref={AUTO_TANK_DOWN_REF} src={AUTO_TANK_DOWN} alt="tank up" style={{width:0, height:0}} />
      <img ref={AUTO_TANK_LEFT_REF} src={AUTO_TANK_LEFT} alt="tank up" style={{width:0, height:0}} />
      <img ref={AUTO_TANK_RIGHT_REF} src={AUTO_TANK_RIGHT} alt="tank up" style={{width:0, height:0}} />
      <img ref={BRICK_REF} src={BRICK} alt="brick" style={{width:0, height:0}} />
      <img ref={STEEL_REF} src={STEEL} alt="steel" style={{width:0, height:0}} />
      <img ref={EAGLE_REF} src={EAGLE} alt="eagle" style={{width:0, height:0}} />
    </div>
  ); 
}

export default ImagesCache;