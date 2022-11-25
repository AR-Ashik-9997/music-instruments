import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardCatagories = ({ data }) => {

  return (
    <Col lg={4} md={6} sm={12}>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">{data.name}</Card.Title>
          <div className="d-flex justify-content-center">
            <Link to={`/category/${data.categoryId}`}>
              <Button variant="outline-primary">View Product</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardCatagories;
