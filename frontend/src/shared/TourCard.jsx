import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculateAvgRating from "../utils/avgRating";

const TourCard = ({ tour }) => {
  const {
    _id,
    title = "No Title",
    city = "Unknown City",
    photo = "",
    price = 0,
    featured = false,
    reviews = [],
  } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="tour_card">
      <Link to={`/tour/${_id}`} className="tour_link">
        <Card>
          <div className="tour_img">
            <img src={photo} alt={`Tour image for ${title}`} />
            {featured && <span>Featured</span>}
          </div>

          <CardBody>
            <div className="card_top d-flex align-items-center justify-content-between">
              <span className="tour_location d-flex align-items-center gap-1">
                <i className="ri-map-pin-line"></i> {city}
              </span>
              <span className="tour_rating d-flex align-items-center gap-1">
                <i className="ri-star-fill star"></i>{" "}
                {avgRating === 0 ? "" : avgRating}
                {totalRating === 0 ? (
                  "Not rated"
                ) : (
                  <span>({reviews.length})</span>
                )}
              </span>
            </div>

            <h5 className="tour_title">{title}</h5>
            <div className="card_bottom d-flex align-items-center justify-content-between mt-3">
              <h5>
                ${price} <span>/per person/</span>
              </h5>
              <button className="booking_btn">Book Now</button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default TourCard;
