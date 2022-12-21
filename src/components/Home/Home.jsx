import React, { useRef, useState } from "react";
import { Button, Card, Col, Container, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import CardCatagories from "./../CardCatagories/CardCatagories";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import AdvertiseItems from "../Advertise/AdvertiseItems";
import useTitle from "./../../utility/TitleHooks";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import * as EmailValidator from "email-validator";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../utility/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  useTitle("Sonic Revolution");
  const notify = () => toast.success("Email sent successfully.");
  const notify2 = () => toast.error("Please Login First.");
  const { data: catagoriesData = [] } = useQuery({
    queryKey: ["catagoriesData"],
    queryFn: async () => {
      const res = await fetch("https://music-data-six.vercel.app/cardCategory");
      const data = await res.json();
      return data;
    },
  });
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
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
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if (user?.email) {
      emailjs
        .sendForm(
          "service_7fz98dw",
          "template_008ym0p",
          form.current,
          "gOFaU8Dkgb5g-0h8Z"
        )
        .then(
          (result) => {
            notify();
            e.target.reset();
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      notify2();
    }
  };
  const { data: addvertiseProduct = [] } = useQuery({
    queryKey: ["addvertiseProduct"],
    queryFn: async () => {
      const res = await fetch(
        "https://music-data-six.vercel.app/advertiseProduct"
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <section className="mt-5 mb-5">
        <Container>
          <Row className="flex-column-reverse flex-lg-row">
            <Col
              lg={6}
              md={12}
              sm={12}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div className="mt-5">
                <h1 className="fs-1">Choose Our Top Picks Music Instruments</h1>
                <p className="w-75 text-justify mt-4 fs-5">
                  It's easy to play any musical instrument: all you have to do
                  is touch the right key at the right time and the instrument
                  will play itself.
                </p>
                <Link to="/">
                  <Button variant="dark" className="mt-4 btn-lg">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </Col>
            <Col
              lg={6}
              md={12}
              sm={12}
              className="d-flex flex-column align-items-center justify-content-center "
            >
              <img
                src="https://i.ibb.co/6WVHjRh/banner.png"
                alt=""
                className="img-fluid mx-auto d-block"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {addvertiseProduct.length > 0 ? (
        <>
          <section className="mt-5">
            <Container>
              <div className="d-flex justify-content-between pt-5">
                <hr className="hr-width" />
                <h3 className="ms-5 me-5 text-center">Advertise Product</h3>
                <hr className="hr-width" />
              </div>
              <Row className="g-4 mt-3">
                <Carousel>
                  {addvertiseProduct.map((advProduct) => (
                    <AdvertiseItems key={advProduct._id} data={advProduct} />
                  ))}
                </Carousel>
              </Row>
            </Container>
          </section>
        </>
      ) : (
        <></>
      )}

      <section className="mt-5">
        <Container>
          <div className="d-flex justify-content-between pt-5 pb-5">
            <hr className="hr-width" />
            <h3 className="ms-5 me-5 text-center">Product Category</h3>
            <hr className="hr-width" />
          </div>
          <Row className="g-4">
            {catagoriesData.map((category) => (
              <CardCatagories data={category} key={category._id} />
            ))}
          </Row>
        </Container>
      </section>
      <section className="mt-5 mb-5">
        <Container>
          <div className="d-flex justify-content-between pt-5 pb-5">
            <hr className="hr-width" />
            <h3 className="ms-5 me-5 text-center">Customer Review</h3>
            <hr className="hr-width" />
          </div>
          <Row className="g-4">
            <Col lg={4} md={4} sm={12}>
              <Card className="rounded-4">
                <img
                  src="https://www.playwire.com/hubfs/Stacy-headshot.png"
                  className="testimonial-image d-block mx-auto mt-5"
                  alt=""
                />

                <Card.Body>
                  <Card.Text className="text-justify text-center">
                    I really like that it has integrations with Google Analytics
                    and social media, so I don’t have to manually create tables/
                    charts for these in the reports.
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                    <AiOutlineStar className="fs-3 star-color" />
                    <AiOutlineStar className="fs-3 star-color" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Card className="rounded-4">
                <img
                  src="https://www.playwire.com/hubfs/Jayson-headshot.png"
                  className="testimonial-image d-block mx-auto mt-5"
                  alt=""
                />

                <Card.Body>
                  <Card.Text className="text-justify text-center">
                    “Understanding the entire customer lifecycle in Music
                    Instruments from discovery to purchase is crucial for
                    increasing our conversions.”
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                    <AiOutlineStar className="fs-3 star-color" />
                    <AiOutlineStar className="fs-3 star-color" />
                    <AiOutlineStar className="fs-3 star-color" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Card className="rounded-4">
                <img
                  src="https://www.playwire.com/hubfs/Scott%20headshot.png"
                  className="testimonial-image d-block mx-auto mt-5"
                  alt=""
                />

                <Card.Body>
                  <Card.Text className="text-justify text-center">
                    provided us the ability to track unique events and segment
                    who the users are and what each user is doing. Google
                    Analytics doesn’t allow that.
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                    <AiFillStar className="fs-3 star-color" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-5 mb-5">
        <Container>
          <Row className="flex-column-reverse flex-lg-row">
            <Col
              lg={6}
              md={6}
              sm={12}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div>
                <h1>Join Our Mail List</h1>
                <p className="w-75 mt-4">
                  Signup to be the first to here about exclusive deals, special
                  offer and upcomming collections
                </p>

                <Form
                  ref={form}
                  onSubmit={sendEmail}
                  className="d-flex w-75 mt-4"
                >
                  <Form.Group
                    className="mb-3 d-none w-25"
                    controlId="formBasicName"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name"
                      name="user_name"
                      value={user?.displayName}
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 w-100 me-2"
                    controlId="formBasicemail"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      name="user_email"
                      onChange={handleEmailChange}
                      required
                      autoComplete="off"
                    />
                    <Form.Text className="text-danger ">
                      {errors.email}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    className="d-none w-25"
                    controlId="formBasicDescription"
                  >
                    <textarea
                      name="message"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="Your Description here...."
                      rows="3"
                      value="I want to join the sonic revolution service. You are requested to please accept my joining and allow me to work under your supervision. Please advise as necessary."
                    />
                  </Form.Group>
                  <div>
                    <Button
                      variant="dark"
                      className="btn-md"
                      type="submit"
                      value="Send"
                    >
                      Join<span className="ms-2"></span>Now
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
            <Col
              lg={6}
              md={6}
              sm={12}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <img
                src="https://i.ibb.co/k6brHLq/image-removebg-preview.png"
                alt=""
                className="img-fluid mx-auto d-block"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <Toaster />
    </div>
  );
};

export default Home;
