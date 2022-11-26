import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardCatagories = ({ data }) => {

  return (
    <Col lg={4} md={6} sm={12}>
      <Card className="bg-black rounded-3">
        <img src="https://www.schagerl.com/drums/v2/wp-content/uploads/2018/04/Dark-Vintage-Set.jpg" className="rounded-3" alt=""/>        
        <Card.Body>          
          <div className="d-flex justify-content-center">
            <Link to={`/category/${data.categoryId}`}>
              <Button variant="outline-primary">View Product</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardCatagories;
