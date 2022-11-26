import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SellerInformation = () => {
  const notify = () => toast.success("Delete Successful.");
  const { data: sellerInfo = [], refetch } = useQuery({
    queryKey: ["sellerInfo"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allseller?role=seller");
      const data = await res.json();
      return data;
    },
  });
  const handleDelete = (id) => {
    const agree = window.confirm(
      `Are you sure you want to delete: ${id.username}`
    );
    if (agree) {
      axios({
        method: "DELETE",
        url: `http://localhost:5000/seller-info-delete/${id._id}`,
      })
        .then((response) => console.log(response.data))
        .then(() => {
          notify();
          refetch();
        });
    }
  };
  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="mt-5 mb-5">
            {sellerInfo.length > 0 ? (
              <>
                <h1 className="text-center mb-5">All Buyer Information</h1>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Photo</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Acion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerInfo.map((seller) => (
                      <tr key={seller._id}>
                        <td>
                          <img
                            src={seller.photo}
                            className="order-image"
                            alt=""
                          />
                        </td>
                        <td>{seller.username}</td>
                        <td>{seller.email}</td>
                        <td>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(seller)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <h1 className="text-center mt-5 mb-5">No Data available</h1>
            )}
          </div>
        </Col>
      </Row>
      <Toaster />
    </Container>
  );
};

export default SellerInformation;
