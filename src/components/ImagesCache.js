import React, { Component } from 'react';

const TANK_UP = "/images/tank-up.png";
const TANK_DOWN = "/images/tank-down.png";
const TANK_LEFT = "/images/tank-left.png";
const TANK_RIGHT = "/images/tank-right.png";

export const TANK_UP_REF = React.createRef();
export const TANK_DOWN_REF = React.createRef();
export const TANK_LEFT_REF = React.createRef();
export const TANK_RIGHT_REF = React.createRef();
export const TANK_SIZE = 50;

function ImagesCache() {
  return (
    <div>
      <img ref={TANK_UP_REF} src={TANK_UP} alt="tank up" style={{width:0, height:0}} />
      <img ref={TANK_DOWN_REF} src={TANK_DOWN} alt="tank up" style={{width:0, height:0}} />
      <img ref={TANK_LEFT_REF} src={TANK_LEFT} alt="tank up" style={{width:0, height:0}} />
      <img ref={TANK_RIGHT_REF} src={TANK_RIGHT} alt="tank up" style={{width:0, height:0}} />
    </div>
  ); 
}

export default ImagesCache;