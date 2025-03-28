import React from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter_content">
              <h2>Subscribe now to receive essential travel tips and updates!</h2>

              <div className="newsletter_input">
                <input type="email" placeholder="Enter your email" />
                <button type="submit" className="btn newsletter_btn">
                  Subscribe
                </button>
              </div>

              <p>
                Stay informed with the latest news and insights in the travel world. Your next adventure awaits!
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter_img">
              <img src={maleTourist} alt="Tourist" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
