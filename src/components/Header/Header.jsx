import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utility/AuthProvider";
const Header = () => {
  const { user, Logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem('secret-token');
    Logout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  return (
    <Navbar className="navbar mt-4" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-2 fw-bold">
        <img
            src="https://i.postimg.cc/jjQKCrSz/pngwing-com.png"
            className="d-inline-block align-center me-3"
            width="50"
            height="50"
            alt=""
          />
          Sonic Revolution
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="fs-5">
              Home
            </Nav.Link>            
          <Nav.Link as={Link} to="/all-category" className="fs-5">
              All Category
            </Nav.Link>            
            <Nav.Link as={Link} to="/dashboard" className="fs-5">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs" className="fs-5 me-2">
              Blog
            </Nav.Link>
            
            {user && user?.photoURL ? (
              <>                
                <Nav.Link
                  as={Link}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={user?.displayName}
                  className="nav-link"
                >
                  <img
                    src={user?.photoURL}
                    variant="top"
                    className="user-profile me-2"
                    alt="Avatar"
                  />
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
            {user?.uid ? (
              <div className="d-flex align-items-center d-grid gap-3 d-block">
                <Button
                  onClick={handleSignOut}
                  variant="dark btn-md"
                >
                  Sign-Out
                </Button>
              </div>
            ) : (
              <div className="d-flex align-items-center d-grid gap-3 d-block">
                <Link to="/signIn">
                  <Button variant="dark btn-md">
                    Sign-In
                  </Button>
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
