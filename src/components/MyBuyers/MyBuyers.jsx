import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { AuthContext } from "../../utility/AuthProvider";

const MyBuyers = () => {
    const {user}=useContext(AuthContext);  
  const { data: buyerInfo = []} = useQuery({
    queryKey: ["buyerInfo"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/buyerInfo?email=${user.email}`);
      const data = await res.json();
      return data;
    },
  });
  
  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="mt-5 mb-5">
            <h1 className="text-center mb-5">Buyer Information</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Phone</th>
                  <th className="text-center">Location</th>
                  <th className="text-center">Preoduct Name</th>
                  <th className="text-center">Status</th>                  
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyBuyers;
