import React, { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../BookingModal/BookingModal";

const CategoryProducts = () => {
  const products = useLoaderData();
  const [modalShow, setModalShow] = useState(false);
  const [product] = useState(products[0]);  
 
  return (
    <Container> 
      <Row>
        {products.map((product) => (          
          <Col lg={4} md={6} sm={12} key={product._id}>
            <Card>
              <Row>
                <Col md={6}>
                  <Card.Img
                    variant="top"
                    src="https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
                  className="img-fluid"
                  />
                </Col>
                <Col md={6}>
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.resalePrice}</Card.Text>
                    </div>
                    <Card.Text>{product.postedTime}</Card.Text>
                  </Card.Body>
                  <Card.Header>Featured</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Location: {product.location}</ListGroup.Item>
                    <ListGroup.Item>Used-time: {product.yearsOfUse}</ListGroup.Item>
                    <ListGroup.Item>Original-Price: {product.originalPrice}</ListGroup.Item>
                    <ListGroup.Item>Seller-Name: {product.sellerName}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Button variant="outline-primary" onClick={() => setModalShow(true)}>Book Now</Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      <BookingModal show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        />      
    </Container>
  );
};

export default CategoryProducts;
