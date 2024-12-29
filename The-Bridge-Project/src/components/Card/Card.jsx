import React from "react";
import "./Card.css";
import B0 from "../../assets/B0.jpg";

const Card = () => {
  return (
    <div className="card">
      <img src={B0} alt="" className="img-container" />
      <div className="info-container">
        <h2 className="text-container">
          Improve your skills on your own <br />
          To prepare for a better future
        </h2>
        <button>REGISTER NOW</button>
      </div>
      <div className="gris-screen"></div>
    </div>
  );
};

export default Card;
