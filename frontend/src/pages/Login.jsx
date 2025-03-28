import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/login.css";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../utils/config";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setError(null);
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Failed to login.");
      }

      const result = await res.json();

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      navigate("/"); // Chuyển đến trang chủ sau khi đăng nhập thành công
    } catch (err) {
      setError(err.message);
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={loginImg} alt="Login" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      {...register("email", {
                        required: "Email is a required field",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })}
                    />
                    {errors?.email && (
                      <span className="text-danger">
                        * {errors.email.message}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is a required field",
                        pattern: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <span className="text-danger">
                        * {errors.password.message}
                      </span>
                    )}
                  </FormGroup>
                  <Button className="btn secondary__btn auth_btn" type="submit">
                    Login
                  </Button>
                  {error && <p className="text-danger mt-2">{error}</p>}
                </Form>
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">Create an account</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
