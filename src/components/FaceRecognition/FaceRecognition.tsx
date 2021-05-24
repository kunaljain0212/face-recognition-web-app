import React from "react";
import { ImageBoxArray } from "../../interfaces/interfaces";
import "./FaceRecognition.css";

interface IProps {
  imageURL: string;
  box: ImageBoxArray;
}

const FaceRecognition: React.FC<IProps> = ({ imageURL, box }) => {
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
          return (
            <div
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
