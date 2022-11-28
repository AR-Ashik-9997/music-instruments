import React from "react";
import { Button, Card, Col, Container, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import CardCatagories from "./../CardCatagories/CardCatagories";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineStar,AiFillStar} from "react-icons/ai";
import AdvertiseItems from "../Advertise/AdvertiseItems";
import useTitle from './../../utility/TitleHooks';

const Home = () => {
  useTitle("Music Instruments");
  const { data: catagoriesData = [] } = useQuery({
    queryKey: ["catagoriesData"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/cardCategory");
      const data = await res.json();
      return data;
    },
  });

  const { data: addvertiseProduct = [], } = useQuery({
    queryKey: ["addvertiseProduct"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/advertiseProduct"
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
                <Button variant="dark" className="mt-4 bt-lg">Shop Now</Button>
              </div>
            </Col>
            <Col
              lg={6}
              md={12}
              sm={12}
              className="d-flex flex-column align-items-center justify-content-center "
            >
              <img
                src="https://i.ibb.co/Drd787T/banner.png"
                alt=""
                className="img-fluid mx-auto d-block"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {addvertiseProduct.length > 0 ? (
        <>
          <section className="mt-5 mb-5">
            <Container>
              <div className="d-flex justify-content-between pt-5 pb-5">
                <hr className="hr-width" />
                <h3 className="ms-5 me-5 text-center">Advertise Product</h3>
                <hr className="hr-width" />
              </div>
              <Row className="g-4 mt-3">
                {addvertiseProduct.map((advProduct) => (
                  <AdvertiseItems key={advProduct._id} data={advProduct} />
                ))}
              </Row>
            </Container>
          </section>
        </>
      ) : (
        <></>
      )}

      <section className="mt-5 mb-5">
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
              <Card>
                <img
                  src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png"
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
              <Card>
                <img
                  src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png"
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
              <Card>
                <img
                  src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png"
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

                <Form className="d-flex w-75 mt-4">
                  <Form.Control
                    type="search"
                    placeholder="Enter your email address"
                    className="me-2"
                    aria-label="Search"
                  />
                  <div>
                    <Button variant="dark" className="btn-md">
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
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
