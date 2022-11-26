import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../utility/AuthProvider";

const SellerInformation = () => {
  //   const { user } = useContext(AuthContext);
  //   const notify = () => toast.success("Delete Successful.");
  //   const { data: MyProduct = [], refetch } = useQuery({
  //     queryKey: ["MyProduct"],
  //     queryFn: async () => {
  //       const res = await fetch(
  //         `http://localhost:5000/sellerProduct?email=${user.email}`
  //       );
  //       const data = await res.json();
  //       return data;
  //     },
  //   });
  //   const handleDelete = (product) => {
  //     const agree = window.confirm(
  //       `Are you sure you want to delete: ${product.productName}`
  //     );
  //     if (agree) {
  //       axios({
  //         method: "DELETE",
  //         url: `http://localhost:5000/seller-product-delete/${product._id}`,
  //       })
  //         .then((response) => console.log(response.data))
  //         .then(() => {
  //           notify();
  //           refetch();
  //         });
  //     }
  //   };
  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="mt-5 mb-5">
            <h1 className="text-center mb-5">All Seller Information</h1>
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

export default SellerInformation;
