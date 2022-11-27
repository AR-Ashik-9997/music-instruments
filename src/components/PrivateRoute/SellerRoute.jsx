import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./../../utility/AuthProvider";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isRole, setRole] = useState([]);
  const [adminLoading, setLoading] = useState(true);
  useEffect(() => {
    if (user.email) {
      fetch(`http://localhost:5000/access/${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          setRole(data.role);
          setLoading(false);
        });
    }
  }, [user.email]);
  if (loading || adminLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (user && isRole === "seller") {
    return children;
  }
  return <Navigate to="/signIn" state={{ from: location }} replace />;
};

export default SellerRoute;
