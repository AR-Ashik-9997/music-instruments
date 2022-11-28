import React from "react";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useTitle from "../../utility/TitleHooks";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  useTitle("Check Out");
  const booking = useLoaderData();

  return (
    <div>
      <h1>payment </h1>
      <div className="w-25 mt-5">
        <Elements stripe={stripePromise}>
          <CheckOutForm data={booking}/>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
