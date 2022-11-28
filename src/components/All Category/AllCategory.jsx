import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade } from "swiper";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import useTitle from "../../utility/TitleHooks";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const AllCategory = () => {
  useTitle("All Category");
  const [loading, setLoading] = useState(true);
  const { data: allcategory = [] } = useQuery({
    queryKey: ["allcategory"],
    queryFn: async () => {
      const res = await fetch("https://music-data-six.vercel.app/allCategory");
      const data = await res.json();
      setLoading(false);
      return data;
    },
  });
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }
  return (
    <>
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
                <h1>Choose Our Top Picks Music Instruments</h1>
                <p className="w-75 text-justify mt-4 fs-5">
                  It's easy to play any musical instrument: all you have to do
                  is touch the right key at the right time and the instrument
                  will play itself.
                </p>
                <Button className="mt-4">Shop Now</Button>
              </div>
            </Col>
            <Col lg={6} md={12} sm={12}>
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
      <section>
        <Container>
        <div className="d-flex justify-content-between pt-5 pb-5">
            <hr className="hr-width" />
            <h3 className="ms-5 me-5 text-center">All Category</h3>
            <hr className="hr-width" />
          </div>
          <Row className="g-4">
            {allcategory.map((cat) => (
              <Col lg={4} md={6} sm={12}>
                <Card className="bg-black rounded-3">
                  <img
                    src={cat.image}
                    className="rounded-3 card-image"
                    alt=""
                  />
                  <Card.Body>
                    <div className="d-flex justify-content-center">
                      <Link to={`/category/${cat.categoryId}`}>
                        <Button variant="dark" className="bg-black">
                          View Product
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AllCategory;
