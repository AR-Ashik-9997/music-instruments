import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const MyOrder = () => {
  const { data: orderInfo = [] } = useQuery({
    queryKey: ["orderInfo"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/orderInfo");
      const data = await res.json();
      return data;
    },
  });

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="mt-5 mb-5">
            {orderInfo.length > 0 ? (
              <>
                <h1 className="text-center mb-5">My Order</h1>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Image</th>
                      <th className="text-center">Preoduct Name</th>
                      <th className="text-center">price</th>
                      <th className="text-center">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderInfo.map((order) => (
                      <tr key={order._id}>
                        <td className="text-center">
                          <img src={order.img} className="order-image" alt="" />
                        </td>
                        <td className="text-center">{order.productName}</td>
                        <td className="text-center ">$ {order.sellPrice}</td>
                        <td className="text-center"><Button variant="outline-primary">Payment</Button></td>
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
    </Container>
  );
};

export default MyOrder;
