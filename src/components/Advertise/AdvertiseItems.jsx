import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../utility/AuthProvider";
import BookingModal from "../BookingModal/BookingModal";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";

const AdvertiseItems = ({ data }) => {
  const {
    productName,
    image,
    sellPrice,
    description,
    location,
    used,
    originalPrice,
    sellerName,
    date,
  } = data;
  const notify = () => toast.success("Report Successfully sent.");
  const { user } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState([]);

  const handleReport = (report) => {
    axios({
      method: "post",
      url: "https://music-data-six.vercel.app/AddReport",
      data: {
        category: report.category,
        product: report.productName,
        username: user.displayName,
        email: user.email,
      },
    })
      .then((response) => console.log(response))
      .then(() => {
        notify();
      });
  };
  return (
    <>
      <Col lg={12} md={12} sm={12}>
        <Card className="bg-background">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <Link>
                <PhotoProvider>
                  <PhotoView src={image}>
                    <Card.Img
                      variant="top"
                      src={image}
                      className="card-image h-100"
                    />
                  </PhotoView>
                </PhotoProvider>
              </Link>
            </Col>
            <Col lg={8} md={6} sm={12}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Card.Title className="fs-3">{productName}</Card.Title>
                  <Card.Title className="fs-3">$ {sellPrice}</Card.Title>
                </div>
                <Card.Text className="font-size mt-3 fw-bold">{date}</Card.Text>
                <Card.Text className=" text-justify font-size mt-3 d-none d-lg-block d-md-block">
                  {description.substr(0, 250)}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <div>
                    <Card.Text className="font-size fw-bold">
                      Location: {location}
                    </Card.Text>
                    <Card.Text className="font-size fw-bold">
                      used of time: {used}
                    </Card.Text>
                  </div>

                  <div>
                    <Card.Text className="font-size fw-bold">
                      Original Price: ${originalPrice}
                    </Card.Text>
                    <Card.Text className="font-size fw-bold">
                      {sellerName}
                    </Card.Text>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Button
                    variant="dark"
                    onClick={() => {
                      setModalShow(true);
                      setProduct(data);
                    }}
                  >
                    Book Now
                  </Button>
                  <Button variant="dark" onClick={() => handleReport(data)}>
                    Report to Admin
                  </Button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
      <BookingModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      product={product}
    />
    <Toaster />

    </>
  );
};

export default AdvertiseItems;

    