import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";

const CheckOutForm = ({ data }) => {

  const [cardError, setCardError] = useState([]);
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { _id,productId, sellPrice, username, buyerEmail } = data;

  useEffect(() => {
    fetch("https://music-data-six.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("secret-token")}`,
      },
      body: JSON.stringify({ sellPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [sellPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: username,
            email: buyerEmail,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {   
      const payment = {
        price:sellPrice,
        transactionId: paymentIntent.id,
        email:buyerEmail,
        bookingId: _id,
        productId: productId,
        status: "sold"
      };
      fetch("https://music-data-six.vercel.app/paymentInfo-stored", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("secret-token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
  };
  return (
    <div className="pb">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#424770",
                "::placeholder": {
                  color: "#1B0803",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="d-flex justify-content-center mt-5">
          <Button
            variant="dark"
            type="submit"
            className="w-75"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </Button>
        </div>
      </form>
      <p className="text-danger">{cardError}</p>
      {success && (
        <div>
          <p className="text-success">{success}</p>
          <p>
            Your transactionId: <span className="fw-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckOutForm;
