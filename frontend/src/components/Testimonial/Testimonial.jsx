import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          "Our trip with this company was unforgettable! The guides were knowledgeable, and every detail was well-planned. Highly recommend!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="John Doe" />
          <div>
            <h5 className="mb-0 mt-3">John Doe</h5>
            <p>Traveler</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          "I had the time of my life! The experiences offered were diverse, and the staff went above and beyond to ensure our satisfaction."
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="Mosa Lisa" />
          <div>
            <h5 className="mb-0 mt-3">Mosa Lisa</h5>
            <p>Traveler</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          "A remarkable journey filled with wonderful memories! The accommodations were excellent, and the tours were truly enriching."
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="Patrick Erva" />
          <div>
            <h5 className="mb-0 mt-3">Patrick Erva</h5>
            <p>Traveler</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          "Fantastic service and incredible experiences! I will cherish the memories forever. Can't wait for my next adventure!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="Emily Johnson" />
          <div>
            <h5 className="mb-0 mt-3">Emily Johnson</h5>
            <p>Traveler</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          "An unforgettable experience! Every moment was thoughtfully planned, and I felt supported throughout the journey."
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="Michael Brown" />
          <div>
            <h5 className="mb-0 mt-3">Michael Brown</h5>
            <p>Traveler</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
