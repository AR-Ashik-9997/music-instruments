import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../utility/AuthProvider";
import BookingModal from "../BookingModal/BookingModal";

const CategoryProducts = () => {
  const {user}= useContext(AuthContext);
  const products = useLoaderData();
  const [modalShow, setModalShow] = useState(false);
  const [product] = useState(products[0]);
  const handleReport=()=>{
    axios({
      method: "post",
      url: "http://localhost:5000/AddReport",
      data: {
        category:product.category,
        product:product.productName,
        username:user.displayName,
        email:user.email,
      },
    })
      .then((response) => console.log(response))
      .then({});
  }
  
  return (
    <Container>
      {products.length > 0 ? (
        <>
          <Row className="g-4">
            {products.map((product) => (
              <Col lg={4} md={6} sm={12} key={product._id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="card-image"
                  />
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <Card.Title>{product.productName}</Card.Title>
                      <Card.Title>$ {product.sellPrice}</Card.Title>
                    </div>
                    <Card.Text className="text-justify">
                      {product.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <div>
                        <Card.Text>
                          <strong>Location: </strong> {product.location}
                        </Card.Text>
                        <Card.Text>
                          <strong>used of time: </strong> {product.used}
                        </Card.Text>
                      </div>

                      <div>
                        <Card.Text>
                          <strong>Original Price:</strong> $
                          {product.originalPrice}
                        </Card.Text>
                        <Card.Text>
                          <strong>{product.sellarName}</strong>
                        </Card.Text>
                      </div>
                    </div>
                    <div className="d-flex justify-content-around mt-4">
                      <Button
                        variant="outline-primary"
                        onClick={() => setModalShow(true)}
                      >
                        Book Now
                      </Button>
                      <Button variant="outline-primary" onClick={handleReport}>
                        Report to Admin
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <BookingModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            product={product}
          />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CategoryProducts;
