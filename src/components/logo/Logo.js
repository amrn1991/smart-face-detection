import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 50 }}
        style={{ height: 80, width: 80 }}
      >
        <div className="Tilt-inner pa2">
          <img src={brain} alt="brain logo" style={{paddingTop: '2px'}} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
