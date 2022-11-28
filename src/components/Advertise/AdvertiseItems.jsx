import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
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
  } = data;
  const notify = () => toast.success("Report Successfully sent.");
  const { user } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState([]);

  const handleReport = (report) => {
    axios({
      method: "post",
      url: "http://localhost:5000/AddReport",
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
      <Col lg={4} md={6} sm={12}>
        <Card>
          <Link>
            <PhotoProvider>
              <PhotoView src={image}>
                <Card.Img variant="top" src={image} className="card-image" />
              </PhotoView>
            </PhotoProvider>
          </Link>

          <Card.Body>
            <div className="d-flex justify-content-between">
              <Card.Title>{productName}</Card.Title>
              <Card.Title>$ {sellPrice}</Card.Title>
            </div>
            <Card.Text className="text-justify">{description.substr(0, 250)}</Card.Text>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Text>
                  <strong>Location: {location}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>used of time: {used}</strong>
                </Card.Text>
              </div>

              <div>
                <Card.Text>
                  <strong>Original Price: ${originalPrice}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>{sellerName}</strong>
                </Card.Text>
              </div>
            </div>
            <div className="d-flex justify-content-around mt-4">
              <Button
                variant="outline-primary"
                onClick={() => {
                  setModalShow(true);
                  setProduct(data);
                }}
              >
                Book Now
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => handleReport(data)}
              >
                Report to Admin
              </Button>
            </div>
          </Card.Body>
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
