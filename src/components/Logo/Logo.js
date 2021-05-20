import React from "react";
import Tilt from "react-tilt";
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
  return (
    <div className="ma4 mt0 pa3 ">
      <Tilt
        className="Tilt br-100 shadow-2"
        options={{ max: 55 }}
        style={{ height: 126, width: 120 }}
      >
        <div className="Tilt-inner pb4"><img style={{paddingBottom: '20px'}} alt='logo' src={brain}/> </div>
      </Tilt>
    </div>
  );
};

export default Logo;
