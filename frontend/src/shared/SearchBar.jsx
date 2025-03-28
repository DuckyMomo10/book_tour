import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "./../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef("");
  const maxGroupSizeRef = useRef("");
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value || "";
    const distance = distanceRef.current.value || "";
    const maxGroupSize = maxGroupSizeRef.current.value || "";

    // Tạo chuỗi truy vấn với các tham số
    const queryString = new URLSearchParams({
      city: location,
      distance,
      maxGroupSize,
    }).toString();

    const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?${queryString}`);

    if (!res.ok) {
      alert('Could not get tour');
      return;
    }

    const result = await res.json();
    navigate(`/tours/search?${queryString}`, { state: result.data });
  };

  return (
    <Col lg="12">
      <div className="search_bar">
        <Form className="form-container d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="text"
                placeholder="Distance k/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form_group form_group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input
                type="text"
                placeholder="0"
                ref={maxGroupSizeRef}
              />
            </div>
          </FormGroup>
          <span className="search_icon" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
