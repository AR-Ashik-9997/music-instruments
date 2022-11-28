import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <img
          src="https://i.ibb.co/gTn18qd/Daco-5259217.png"
          alt=""
          className="d-block mx-auto error-image "
        />
      </div>
      <div className="d-flex justify-content-center">
        <Link to="/">
          <Button variant="outline-info">Go Home</Button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
