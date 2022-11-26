import React from "react";
import { Button, Card, Col, Container, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import CardCatagories from "./../CardCatagories/CardCatagories";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: catagoriesData = [] } = useQuery({
    queryKey: ["catagoriesData"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/cardCategory");
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
              md={6}
              sm={12}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div className="mt-5">
                <h1>Choose Our Top Picks Music Instruments</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quas, quibusdam!
                </p>
                <Button>Shop Now</Button>
              </div>
            </Col>
            <Col
              lg={6}
              md={6}
              sm={12}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div>
                <img
                  src="https://i.postimg.cc/C14dvcMw/banner.png"
                  alt=""
                  className="img-fluid mx-auto d-block"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-5 mb-5">
        <Container>
          <Row className="g-4">
            {catagoriesData.map((category) => (
              <CardCatagories data={category} key={category._id} />
            ))}
          </Row>
        </Container>
      </section>
      <section className="mt-5 mb-5">
        <Container>
          <div className="d-flex justify-content-between pt-5">
            <hr className="hr-width" />
            <h4 className="ms-5 me-5 text-center">Community of Fans</h4>
            <hr className="hr-width" />
          </div>
          <Row className="g-4 mt-3">
            <Col lg={4} md={4} sm={12}>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-5 mb-5">
        <Container>
          <Row className="flex-column-reverse flex-lg-row">
            <Col lg={6} md={6} sm={12} className="d-flex flex-column align-items-center justify-content-center">
              <div>
              <h1>Join Our Mail List</h1>
              <p className="w-75 mt-4">
                Signup to be the first to here about exclusive deals, special
                offer and upcomming collections
              </p>
              
              <Form className="d-flex w-75 mt-4">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} className="d-flex flex-column align-items-center justify-content-center">
              <img src="https://i.ibb.co/k6brHLq/image-removebg-preview.png" alt="" />              
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
