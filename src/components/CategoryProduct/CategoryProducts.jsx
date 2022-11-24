import React from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

const CategoryProducts = () => {
  const products = useLoaderData();
  console.log(products);
  return (
    <Container>
      <Row>
        {products.map((product, index) => (
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
                    <Button variant="outline-primary">Book Now</Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryProducts;
