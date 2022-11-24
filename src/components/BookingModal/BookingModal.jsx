import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const BookingModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4" controlId="formBasicname">
            <Form.Control
              name="username"
              type="text"
              placeholder="Full Name"
              className="rounded-3 "                            
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              className="rounded-3 mb-2"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPrice">
            <Form.Control
              name="price"
              type="text"
              placeholder="Price"
              className="rounded-3 mb-2"
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
            <Form.Control
              name="location"
              type="text"
              placeholder="Location"
              className="rounded-3 mb-2"
              required
              autoComplete="off"
            />
          </Form.Group>
          <div className="d-flex justify-content-center pt-4">
            <Button
              variant="outline-primary"
              type="submit"
              className="w-100 rounded-3"
            >
              submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
