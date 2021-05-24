import React from "react";
import "./ImageLinkForm.css";

interface IProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const ImageLinkForm: React.FC<IProps> = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3">
        This Web App will detect number of faces in your image. Give it a try!!
      </p>
      <div className="center">
        <div className="form center pa3 br-pill shadow-5">
          <input
            id="inputBar"
            className="f4 black pa2 w-70 center "
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-blue br4 pointer"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
