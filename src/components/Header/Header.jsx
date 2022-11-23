import React from "react";
import { Button, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import CardCatagories from "../CardCatagories/CardCatagories";
import Home from './../Home/Home';

const Header = () => {
  return (
    <>
      <section>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Music-Instruments
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/catagory">
                  Catagory
                </Nav.Link>
                <Nav.Link as={Link} to="/addProduct">
                  Add Product
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/blog">
                  Blog
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-primary">Sign-In</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
      <section>
        <Container>
          <Row><Home/></Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="g-4"><CardCatagories/></Row>
        </Container>
      </section>
    </>
  );
};

export default Header;
