import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../utility/AuthProvider";
const AllBuyerInfo = () => {
    return(
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="mt-5 mb-5">
            <h1 className="text-center mb-5">All Buyer Information</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Acion</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Toaster />
    </Container>
  );
};

export default AllBuyerInfo;