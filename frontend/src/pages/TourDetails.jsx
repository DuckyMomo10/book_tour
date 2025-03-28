import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-detail.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "./../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "./../utils/config";
import { AuthContext } from "./../context/AuthContext";
import moment from "moment-timezone";

const TourDetail = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch data from database
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // Destructure tour properties
  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tours;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // Convert date to Vietnam Time
  const convertToVietnamTime = (date) => {
    return moment(date).tz("Asia/Ho_Chi_Minh").format("MMM D, YYYY");
  };

  // Submit review handler
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("Please log in to review a tour");
        return;
      }

      if (reviewText === "") {
        alert("Please enter a review");
        return;
      }

      if (tourRating === null) {
        alert("Please select a rating");
        return;
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = "5bf1f64c9cc04a6ea4e22032243009"; // Replace with your actual API key
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tours]);

  return (
    <>
      <section>
        <Container>
          {loading && <h3 className="text-center pt-5">Loading...</h3>}
          {error && (
            <h3 className="text-center pt-5">Error: {error.message}</h3>
          )}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour_content">
                  <img src={photo} alt="" />

                  <div className="tour_info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour_rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>{" "}
                        {totalRating === 0 ? "Not rated" : avgRating}
                        {totalRating === 0 ? null : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>

                    <div className="tour_extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i> ${price}{" "}
                        /per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i> {distance} km
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  <div>
                    {/* =================== Weather Info Start =============== */}
                    {weatherData && (
                      <Container className="weather_container mt-4">
                      <div className="weather p-3 border rounded bg-light">
                        <h2 className="weather_title text-white text-center mb-4">Weather Forecast</h2>
                        <div className="weather-list">
                          {weatherData.forecast.forecastday.map((day) => (
                            <div key={day.date} className="weather-item text-white">
                              <img
                                src={`https:${day.day.condition.icon}`} // Đường dẫn đến biểu tượng thời tiết
                                alt={day.day.condition.text}
                                className="weather-icon"
                              />
                              <div className="weather-details text-white">
                                <span className="weather-date text-white">{convertToVietnamTime(`${day.date}`)}</span>
                                <span className="weather-condition">{day.day.condition.text}</span>
                                <span className="weather-temp">{day.day.avgtemp_c} °C</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Container>
                    
                    )}

                    {/* =================== Weather Info End =============== */}
                  </div>
                  {/* =================== Tour Reviews Start ===============  */}
                  <div className="tour_reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            key={rating}
                            onClick={() => setTourRating(rating)}
                          >
                            <i
                              className={
                                tourRating >= rating
                                  ? "ri-star-s-fill"
                                  : "ri-star-s-line"
                              }
                            ></i>
                          </span>
                        ))}
                      </div>

                      <div className="review_input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user_reviews">
                      {reviews?.map((review, index) => (
                        <div className="review_item" key={index}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>{convertToVietnamTime(review.createdAt)}</p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}{" "}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* =================== Tour Reviews End ===============  */}
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tours} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetail;
