import React from "react";
import "./service-card.css";

const ServicesCard = ({ item }) => {
  const { imgUrl, title, desc } = item;

  return (
    <div className="service_container">
      <div className="service_item">
        <div className="service_img">
          <img src={imgUrl} alt="" />
        </div>
        <h5>{title}</h5>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
