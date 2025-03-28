import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user._email,
    tourName: tour.title,
    fullName: "",
    phone: "",
    guestSize: 0,
    bookAt: "",
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Send data to the server
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(booking);
    
    try {
      if (!user || user == undefined || user == null) {
        alert("You must be logged in to book a tour.");
        return;
      }

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(booking)
      })
      const result = await res.json()
      
      if (!res.ok) {
        throw new Error(result.message);
      }
      navigate('/Thank-you')
    } catch (error) {
      alert(error.message);
    }

  };

  const serviceFee = 10
  const totalAmount = Number(booking.guestSize) * Number(price) + Number(serviceFee); // Tính tổng số tiền dựa trên số lượng khách và phí dịch vụ

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating == 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ============== Booking Form Start =============== */}
      <div className="booking_form">
        <h5>Infomation</h5>
        <Form className="booking_info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName" // Đổi từ fullname sang fullName
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Guest"
              id="guestSize"
              min="1"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* ============== Booking Form End =============== */}

      {/* ============== Booking Bottom =============== */}
      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} x {booking.guestSize} person(s)
            </h5>
            <span>${price * booking.guestSize}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
      <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
        Book Now
      </Button>
    </div>
  );
};

export default Booking;
