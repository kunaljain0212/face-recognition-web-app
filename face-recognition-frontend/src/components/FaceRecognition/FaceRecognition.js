import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2 pa2">
        <img
          className="ba b--red bw2"
          id="userImage"
          alt=""
          src={imageURL}
          width="500px"
          height="auto"
        ></img>
        {box.map((box) => {
          return (<div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>)
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
