import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardCatagories = () => {
  return (
    <>
      <Col lg={4} md={6} sm={12}>
        <Card>
          <Link>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Link>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CardCatagories;
