import React from "react";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useTitle from "../../utility/TitleHooks";
import { Col, Container, Row, Table } from "react-bootstrap";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  useTitle("Check Out");
  const booking = useLoaderData();
  const {buyerEmail,productName,sellPrice,username}=booking;

  return (
    <Container className="pb mt-5">
      <Row>
        <h1 className="text-center mt-5">Payment Information</h1>        
        <Col lg={6} md={12} sm={12} className=" mt-5">
          <div className="mx-auto w-50 mt-2">
            <div>
              <Elements stripe={stripePromise}>
                <CheckOutForm data={booking} />
              </Elements>
            </div>
          </div>
        </Col>
        <Col lg={6} md={12} sm={12} className="mt-5">
          <Table>
            <thead>
              <tr>
                <th className="text-center">Prduct Name</th>
                <th className="text-center">Prduct Price</th>
                <th className="text-center">User Name</th>
                <th className="text-center">User Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{productName}</td>
                <td className="text-center">{sellPrice}</td>
                <td className="text-center">{username}</td>
                <td className="text-center">{buyerEmail}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
