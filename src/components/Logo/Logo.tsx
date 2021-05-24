import React from "react";
import "./Logo.css";
import brain from "./brain.png";

const Logo: React.FC = () => {
  return (
    <div className="ma4 mt0 pa3 ">
      <div className="Tilt br-100 shadow-2" style={{ height: 126, width: 120 }}>
        <div className="Tilt-inner pb4">
          <img style={{ paddingBottom: "20px" }} alt="logo" src={brain} />{" "}
        </div>
      </div>
    </div>
  );
};

export default Logo;
