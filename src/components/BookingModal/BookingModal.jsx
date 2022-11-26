import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from './../../utility/AuthProvider';
import axios from "axios";
const BookingModal = (props) => {
  const { user } = useContext(AuthContext);
const { _id, image, productName, sellPrice, status } = props.product;

const handleSubmit = (event) => {
  props.onHide();
  event.preventDefault();
  const form = event.target;
  const phone = form.phone.value;
  const location = form.location.value;
  const usename = form.username.value;
  const email = form.email.value;
  axios({
    method: "post",
    url: "http://localhost:5000/bookingProducts",
    data: {
      productId: _id,
      buyerEmail: email,
      usename: usename,
      location: location,
      phone: phone,
      img: image,
      productName: productName,
      sellPrice: sellPrice,
      status: status,
    },
  })
    .then((response) => console.log(response))
    .then({});
  form.reset();
};
return (
  <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    backdrop="static"
  >
    <Modal.Header closeButton>
      <Modal.Title className="justify-content-center">Book Now</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="formBasicname">
          <Form.Control
            name="username"
            type="text"
            placeholder="Full Name"
            className="rounded-3 "
            value={user.displayName}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            className="rounded-3 mb-2"
            value={user.email}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPrice">
          <Form.Control
            name="price"
            type="text"
            placeholder="Price"
            className="rounded-3 mb-2"
            value={sellPrice}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPhone">
          <Form.Control
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="rounded-3 mb-2"
            required
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group controlId="formBasicLocation">
          <Form.Select name="location">
            <option value="Dhaka">Dhaka</option>
            <option value="Khulna">Khulna</option>
            <option value="Barishal">Barishal</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex justify-content-center pt-4">
          <Button
            variant="outline-primary"
            type="submit"
            className="w-100 rounded-3 mb-3"
          >
            submit
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
);
};

export default BookingModal;
