import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg01 from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVid from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import Subtitle from "./../shared/Subtitle";

import SearchBar from "../shared/SearchBar";
import ServicesList from "../services/ServicesList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImageGallery from "../components/Image-gallery/MasonryImageGallery";
import Testimonial from "../components/Testimonial/Testimonial";
import Newsletter from "../shared/Newsletter";

const Home = () => {
    return (
        <>
            {/* =================== Hero Section Start ===============  */}
            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="hero_content">
                                <div className="hero_subtitle d-flex align-items-center">
                                    <Subtitle subtitle={"Know Before You Go"} />
                                    <img src={worldImg} alt="" />
                                </div>
                                <h1>
                                    Traveling opens the door to creating
                                    <span className="highlight"> memories</span>
                                </h1>
                                <p>
                                    Discover new cultures, enjoy breathtaking landscapes, and experience adventures that will stay with you forever. Our platform helps you explore destinations that suit your travel style.
                                </p>
                            </div>
                        </Col>
                        <Col lg="2">
                            <div className="hero_img-box">
                                <img src={heroImg01} alt="" />
                            </div>
                        </Col>
                        <Col lg="2">
                            <div className="hero_img-box hero_video-box mt-4">
                                <video autoPlay loop>
                                    <source src={heroVid} type="video/mp4" />
                                </video>
                            </div>
                        </Col>
                        <Col lg="2">
                            <div className="hero_img-box mt-5">
                                <img src={heroImg02} alt="" />
                            </div>
                        </Col>

                        <SearchBar />
                    </Row>
                </Container>
            </section>
            {/* =================== Hero Section End ===============  */}
            <section>
                <Container>
                    <Row>
                        <Col lg="3">
                            <h5 className="services_subtitle">What we serve</h5>
                            <h2>We offer our best services</h2>
                        </Col>
                        <ServicesList />
                    </Row>
                </Container>
            </section>

            {/* =================== Featured tour section start ===============  */}
            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5">
                            <Subtitle subtitle={"Explore"} />
                            <h2 className="feature_tour-title">Our featured tours</h2>
                            <FeaturedTourList />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* =================== Featured tour section end ===============  */}

            {/* ================= Gallery section start =============== */}
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <Subtitle subtitle={"Gallery"} />
                            <h2 className="gallery_title">
                                Visit our customers' tour gallery
                            </h2>
                        </Col>
                        <Col lg="12">
                            <MasonryImageGallery />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* ================= Gallery section end =============== */}

            {/* ================= Testimonial section start =============== */}
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <Subtitle subtitle={"Fans love"} />
                            <h2 className="testimonial_title">What our fans say about us</h2>
                        </Col>
                        <Col lg="12">
                            <Testimonial />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* ================= Testimonial section end =============== */}
            <Newsletter />
        </>
    );
};

export default Home;
