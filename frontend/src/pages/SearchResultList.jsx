import React, { useState } from "react";
import CommonSection from "./../shared/CommonSection";
import "../styles/tour.css";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from './../shared/Newsletter';

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);

  return (
    <>
      <CommonSection title="Kết Quả Tìm Kiếm Tour" />
      <div className="search">
        <SearchBar />
      </div>
      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <Col lg="12">
                <div className="text-center mt-5">
                  <h2 className="text-danger">Không tìm thấy tour nào!</h2>
                  <p className="text-muted">
                    Vui lòng thử lại với từ khóa khác hoặc thay đổi tiêu chí tìm kiếm.
                  </p>
                </div>
              </Col>
            ) : (
              data?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;
