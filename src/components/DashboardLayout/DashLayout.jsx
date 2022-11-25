import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Header/Header';


const DashLayout = () => {
    return (
        <div>
           <Header/>
            <Container>
                <Row>
                    <Col lg={2} md={2} className="bg-light h-100vh">
                        <Nav>
                        <Nav.Link as={Link} to="/dashboard/myProduct" className='fs-5 text-center'>My Product</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard/myBuyer" className='fs-5 text-center'>My Buyer</Nav.Link>                       
                        </Nav>
                    </Col>
                    <Col lg={10} md={10}>                        
                        <Outlet />
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
};

export default DashLayout;