import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from './../../utility/AuthProvider';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner
          animation="border"
          variant="success"         
        />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;