import React from "react";
import { useNavigate } from "react-router-dom";
import "./back.png";
import "./forward.png";
export default function BackAndForword() {
  const Navigate = useNavigate();
  const back = () => {
    Navigate(-1);
  };
  const forWord = () => {
    Navigate(1);
  };
  const handleBack = (e) => {
    e.preventDefault();

    back();
  };
  const handleforword = (e) => {
    e.preventDefault();

    forWord();
  };
  return (
    <div className="divBackAndForword">
      <div>
        <button type="submit" onClick={handleBack} className="HeaderButton">
          <img src={require("./back.png")} alt=""></img>
        </button>
      </div>
      <div>
        <button type="submit" onClick={handleforword} className="HeaderButton">
          <img src={require("./forward.png")} alt=""></img>{" "}
        </button>
      </div>
    </div>
  );
}
