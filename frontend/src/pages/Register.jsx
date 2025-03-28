import React, { useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../utils/config";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data); // Kiểm tra dữ liệu gửi đi
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error(result); // In chi tiết lỗi
        throw new Error(result.message || "Registration failed.");
      }

      console.log(result);
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (err) {
      console.error(err);
      dispatch({ type: "REGISTER_FAILURE", payload: err.message });
      alert(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={registerImg} alt="Register" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {" "}
                  {/* Gọi onSubmit khi form được gửi */}
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      {...register("username", {
                        required: "* Username is required",
                      })} // Đăng ký trường với react-hook-form
                    />
                    {errors?.username && (
                      <span className="text-danger">
                        {errors.username.message}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        required: "* Email is required",
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      })} // Đăng ký trường với react-hook-form
                    />
                    {errors?.email && (
                      <span className="text-danger">
                        * {errors.email.message}
                      </span>
                    )}
                    {/* Hiển thị thông báo lỗi */}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "* Password is a required field",
                        pattern: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
                      })}
                    />
                    {errors?.password && (
                      <span className="text-danger">
                        * {errors.password.message}
                      </span>
                    )}
                    {/* Hiển thị thông báo lỗi */}
                  </FormGroup>
                  <Button className="btn secondary__btn auth_btn" type="submit">
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
