import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";
import useTitle from "../../utility/TitleHooks";
import { AuthContext } from "./../../utility/AuthProvider";

const MyOrder = () => {
  useTitle("All Order Info");
  const { user, Logout } = useContext(AuthContext);
  const [orderInfo, setOrderInfo] = useState([]);
  const [Pay, setPay] = useState([]);
  useEffect(() => {
    fetch(`https://music-data-six.vercel.app/orderInfo?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("secret-token")}`,
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          return Logout();
        }

        return response.json();
      })
      .then((data) => setOrderInfo(data));
  }, [user?.email, Logout]);

  useEffect(() => {
    fetch(`https://music-data-six.vercel.app/checkpayment?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("secret-token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPay(data);
      });
  }, [user?.email]);

  return (
    <Container className="pb mt-5">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="mt-5 mb-5">
            {orderInfo.length > 0 ? (
              <>
                <h1 className="text-center mb-5">My Order</h1>
                <Table striped bordered hover responsive className="bg-background">
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
                          <Link>
                            <PhotoProvider>
                              <PhotoView src={order.img}>
                                <img
                                  src={order.img}
                                  className="order-image"
                                  alt=""
                                />
                              </PhotoView>
                            </PhotoProvider>
                          </Link>
                        </td>
                        <td className="text-center">{order.productName}</td>
                        <td className="text-center ">$ {order.sellPrice}</td>
                        <td className="text-center">
                          {Pay.email ? (
                            <p>paid</p>
                          ) : (
                            <>
                              <Link to={`/dashboard/payment/${order._id}`}>
                                <Button variant="outline-primary">Pay</Button>
                              </Link>
                            </>
                          )}
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
    </Container>
  );
};

export default MyOrder;
