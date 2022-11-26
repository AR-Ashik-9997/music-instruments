import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../utility/AuthProvider";
import BookingModal from "../BookingModal/BookingModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade } from "swiper";

const CategoryProducts = () => {
  const { user } = useContext(AuthContext);
  const products = useLoaderData();
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState([]);
  console.log(product);
  const handleReport = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/AddReport",
      data: {
        category: product.category,
        product: product.productName,
        username: user.displayName,
        email: user.email,
      },
    })
      .then((response) => console.log(response))
      .then({});
  };

  return (
    <>
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
                <p className="w-75 text-justify mt-4">
                  It's easy to play any musical instrument: all you have to do
                  is touch the right key at the right time and the instrument
                  will play itself
                </p>
                <Button className="mt-4">Shop Now</Button>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Swiper
                spaceBetween={30}
                effect={"fade"}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade]}
                className="mySwiper mt-5"
                breakpoints={{
                  0: {
                    spaceBetween: 30,
                  },
                  480: {
                    spaceBetween: 30,
                  },
                  768: {
                    spaceBetween: 30,
                  },
                  1024: {
                    spaceBetween: 30,
                  },
                  1280: {
                    spaceBetween: 30,
                  },
                }}
              >
                <SwiperSlide>
                  <img
                    src="https://i.ibb.co/YfnmnRX/banner.jpg"
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://i.ibb.co/WKF7JkV/banner-2-removebg-preview-1.png"
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://i.ibb.co/XYfp5zF/banner-3-1.jpg"
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-5 mb-5">
        <Container>
          {products.length > 0 ? (
            <>
              <div className="d-flex justify-content-between pt-5">
                <hr className="hr-width" />
                <h3 className="ms-5 me-5 text-center">Available Products</h3>
                <hr className="hr-width" />
              </div>
              <Row className="g-4 mt-3">
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
                            onClick={() => {
                              setModalShow(true);
                              setProduct(product);
                            }}
                          >
                            Book Now
                          </Button>
                          <Button
                            variant="outline-primary"
                            onClick={handleReport}
                          >
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
            <h1 className="text-center mt-5 mb-5">No Data available</h1>
          )}
        </Container>
      </section>
    </>
  );
};

export default CategoryProducts;
