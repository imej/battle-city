import React from 'react';
import './index.css';

const TankCount = ({count}) => {

  const tanks = [];
  for (let i=0;i<count;i++) {
    tanks.push(<img src="/images/tank-count.png" alt='tank count' key={`tankcount${i}`} />);
  }

  return (
    <div className="tank-count">
      {tanks}
    </div>
  );  
}
    

export default TankCount;