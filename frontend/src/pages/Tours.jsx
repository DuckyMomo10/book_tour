import React, { useState, useEffect } from "react";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import Newsletter from "./../shared/Newsletter";
import CommonSection from "../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import SearchBar from "../shared/SearchBar";
import useFetch from "./../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8); // Dựa trên số lượng tour từ backend
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount]);

  return (
    <>
      <CommonSection title={"Tất Cả Các Tour"} />
      <div className="search">
        <SearchBar />
      </div>
      <section className="pt-0 mt-xl-5">
        <Container>
          {loading && <h3 className="text-center pt-5">Đang tải...</h3>}
          {error && <h3 className="text-center pt-5">Lỗi: {error.message}</h3>}
          {!loading && !error && (
            <Row>
              {/* Hiển thị khi không có kết quả */}
              {tours?.length === 0 && (
                <Col lg="12">
                  <h3 className="text-center pt-5">Không tìm thấy kết quả nào.</h3>
                </Col>
              )}

              {/* Hiển thị danh sách tour */}
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              {/* Hiển thị phân trang nếu có kết quả */}
              {tours?.length > 0 && (
                <Col lg="12">
                  <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                    {[...Array(pageCount).keys()].map((number) => (
                      <span
                        key={number}
                        onClick={() => setPage(number)}
                        className={page === number ? "active_page" : ""}
                      >
                        {number + 1}
                      </span>
                    ))}
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
