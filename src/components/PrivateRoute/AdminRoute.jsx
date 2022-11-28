import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./../../utility/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading, Logout } = useContext(AuthContext);
  const location = useLocation();
  const [isRole, setRole] = useState([]);
  const [adminLoading, setLoading] = useState(true);
  useEffect(() => {
    if (user?.email) {
      fetch(`https://music-data-six.vercel.app/access/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("secret-token")}`,
        },
      })
        .then((response) => {
          if (response.status === 401 || response.status === 403) {
            return Logout();
          }

          return response.json();
        })
        .then((data) => {
          setRole(data.role);
          setLoading(false);
        });
    }
  }, [user?.email, Logout]);

  if (loading || adminLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (user && isRole === "admin") {
    return children;
  }
  return Logout()
    .then(() => {
      <Navigate to="/signIn" state={{ from: location }} replace />;
    })
    .catch((error) => console.error(error));  
   
};

export default AdminRoute;
