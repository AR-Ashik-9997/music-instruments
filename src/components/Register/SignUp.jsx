import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as EmailValidator from "email-validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utility/AuthProvider";

const SignUp = () => {
  const { signUp, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firebase: "",
  });
  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (!EmailValidator.validate(email)) {
      setErrors({ ...errors, email: "Please provide a valid email" });
      setUserInfo({ ...userInfo, email: "" });
    }
    if (EmailValidator.validate(email)) {
      setErrors({ ...errors, email: "" });
      setUserInfo({ ...userInfo, email: e.target.value });
    }
  };
  const handlePasswordChange = (e) => {
    const password = e.target.value;

    if (!/^(?=.*[A-Z])/.test(password)) {
      return setErrors({
        ...errors,
        password: "Must have at least one uppercase character",
      });
    }
    if (!/^(?=.{8})/.test(password)) {
      return setErrors({
        ...errors,
        password: "Must have at least 8 character",
      });
    }
    if (!/^(?=.*[@#$%])/.test(password)) {
      return setErrors({
        ...errors,
        password: "Must have at least one special symbol",
      });
    } else {
      setErrors({ ...errors, password: "" });
      setUserInfo({ ...userInfo, password: e.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const photo = form.photoUrl.value;
    const role = form.role.value;
    const email = userInfo.email;
    const password = userInfo.password;     
    
      signUp(email, password)
      .then((res) => {
        handleupdateProfile(username, photo);       
        setErrors({ ...errors, firebase: "" });
        axios({
          method: "post",
          url: "http://localhost:5000/AddRegister",
          data: {
            username: username,
            photo: photo,
            role: role,
            email: email,
            password: password,
          },
        })
          .then((response) => console.log(response))
          .then({}); 
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        setErrors({ ...errors, firebase: error.message });
      });
  };
  const handleupdateProfile = (name, photoUrl) => {
    const profile = {
      displayName: name,
      photoURL: photoUrl,
    };
    updateUserProfile(profile)
      .then(() => {
        setErrors({ ...errors, firebase: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, firebase: error.message });
      });
  };

  return (
    <Container className="home-container">
      <Row>
        <Col lg={6} md={6} sm={12}>
          <div className="mt-5 pt-5">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-login-4489366-3723273.png"
              alt=""
              className="d-block img-fluid mx-auto"
            />
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} className="d-flex align-items-center pt-5">
          <div className="bg-white w-75 rounded-4 mx-auto mt-5 mb-5">
            <h1 className="text-center mb-4 pt-5">Sign-Up</h1>
            <Form className="mx-auto w-75" onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicname">
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Full Name"
                  className="rounded-3"
                  required
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicphoto">
                <Form.Control
                  name="photoUrl"
                  type="text"
                  placeholder="Photo-URL"
                  className="rounded-3"
                  required
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicRole">
                <Form.Select name="role">
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="rounded-3 mb-2"
                  onChange={handleEmailChange}
                  required
                  autoComplete="off"
                />
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="rounded-3 mb-2"
                  onChange={handlePasswordChange}
                  required
                  autoComplete="off"
                />
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              </Form.Group>
              <span className="text-danger">{errors.firebase}</span>
              <div className="d-flex justify-content-center pb-5 pt-4">
                <Button
                  variant="outline-info"
                  type="submit"
                  className="w-75 mb-4 rounded-3"
                >
                  Sign-Up
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
