import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardCatagories = ({data}) => {
const {_id,name,img}=data;
  return (
    <>
      <Col lg={4} md={6} sm={12}>
        <Card>
          <Link to={`/category/${_id}`}>
            <Card.Img variant="top" src={img} />
          </Link>
          <Card.Body>
            <Card.Title>{name}</Card.Title>            
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CardCatagories;
