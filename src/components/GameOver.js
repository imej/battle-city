import React from 'react';
import './TitleScreen.css';

const GameOver = ({msg}) => 
      <div>
        <span className="centerScreen title">Game Over</span>
        <span className="centerScreen pressSpace">{msg}</span>
      </div>

export default GameOver;