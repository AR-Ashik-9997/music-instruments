import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../utility/AuthProvider";
import Header from "../Header/Header";
import Footer from "./../Footer/Footer";

const DashLayout = () => {
  const { user } = useContext(AuthContext);
  const [isRole, setRole] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/access/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("secret-token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setRole(data.role);
        });
    }
  }, [user?.email]);

  return (
    <div>
      <Header />
      <Container className="pb">
        <Row>
          <Col lg={2} md={2}>
            <Nav>
              {isRole === "seller" && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/dashboard/myProduct"
                    className="fs-5 text-center text-black"
                  >
                    My Product
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/dashboard/addProduct"
                    className="fs-5 text-center text-black"
                  >
                    Add a Product
                  </Nav.Link>
                </>
              )}
              {isRole === "buyer" && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/dashboard/myOrder"
                    className="fs-5 text-center text-black"
                  >
                    My Order
                  </Nav.Link>
                </>
              )}
              {isRole === "admin" && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/dashboard/all-seller"
                    className="fs-5 text-center text-black"
                  >
                    All Seller
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/dashboard/all-buyer"
                    className="fs-5 text-center text-black"
                  >
                    All Buyer
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/dashboard/reported-info"
                    className="fs-5 text-center text-black"
                  >
                    Reported info
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Col>
          <Col lg={10} md={10}>
            <Outlet />            
          </Col>          
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default DashLayout;
