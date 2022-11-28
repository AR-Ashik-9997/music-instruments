import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button, Col, Container, Form, Row} from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../../utility/AuthProvider";
import axios from "axios";
import useTitle from './../../utility/TitleHooks';

const Login = () => {
  useTitle("Sign In");
  const navigate = useNavigate();
  const { signInGoogle, SignInForm} = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; 
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    const email = userInfo.email;
    SignInForm(email, password)
      .then((res) => {
        setErrors({ ...errors, firebase: "" });
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrors({ ...errors, firebase: error.message });
      });
  };

  const googleSignIn = () => {
    signInGoogle(googleProvider)
      .then((res) => {
        setErrors({ ...errors, firebase: "" });
        const user = res.user;
        const currentUser = {
          email: user.email,
        };
        fetch("https://music-data-six.vercel.app/jwt ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("secret-token", data.token);
            fetch(`https://music-data-six.vercel.app/checkRegister?email=${user.email}`, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("secret-token")}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.length > 0) {
                  navigate(from, { replace: true });
                } else {
                  axios({
                    method: "post",
                    url: "https://music-data-six.vercel.app/AddRegister",
                    data: {
                      username: user.displayName,
                      photo: user.photoURL,
                      role: "buyer",
                      email: user.email,
                    },
                  })
                    .then((response) => console.log(response))
                    .then((data) => {
                      navigate(from, { replace: true });
                    });
                }
              });
          });
                      
                 
      })
      .catch((error) => {
        setErrors({ ...errors, firebase: error.message });
      });
  };

  return (
    <Container className="pb">      
      <Row>
        <Col lg={6} md={6} sm={12}>
          <div className="mt-5 pt-5">
            <img
              src="https://i.postimg.cc/63D018m9/man-stands-front-inputted-secured-data-registration-form-login-user-interface-isometric-flat-illustr.png"
              alt=""
              className="d-block img-fluid mx-auto"
            />
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} className="d-flex align-items-center pt-5">
          <div className="bg-background w-75 rounded-4 mx-auto mt-5 mb-5">
            <h1 className="text-center mb-4 pt-5">Sign-In</h1>
            <Form className="mx-auto w-75" onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="rounded-3 mb-2"
                  required
                  autoComplete="off"
                  onChange={handleEmailChange}
                />
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="rounded-3 mb-2"
                  required
                  autoComplete="off"
                />
                <Form.Text className="text-danger">{errors.firebase}</Form.Text>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  type="submit"
                  className="w-50  mb-4 rounded-3"               
                >
                  Sign-In
                </Button>
              </div>
            </Form>
            <p className="text-center mb-4">
              Dont have an account?
              <NavLink
                to="/signUp"
                className="text-decoration-none text-danger"
              >
                {" "}
                SignUp Now
              </NavLink>
            </p>
            <div className="d-flex justify-content-center mb-5">
              <Button variant="outline-dark" onClick={googleSignIn}>
                <FcGoogle className="fs-1" />
              </Button>              
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
