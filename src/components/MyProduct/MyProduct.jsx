import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../utility/AuthProvider";
import useTitle from "../../utility/TitleHooks";
const MyProduct = () => {
  useTitle("Product Info");
  const { user } = useContext(AuthContext);
  const notify = () => toast.success("Delete Successful.");
  const { data: MyProduct = [], refetch } = useQuery({
    queryKey: ["MyProduct"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/sellerProduct?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("secret-token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  const handleAdd = (product) => {
    const update = {
      advertise: "true",
    };
    axios({
      url: `http://localhost:5000/update-advertisement/${product._id}`,
      method: "put",
      data: update,
    })
      .then((response) => console.log(response.data))
      .then(() => {
        refetch();
      });
  };

  const handleDelete = (product) => {
    const agree = window.confirm(
      `Are you sure you want to delete: ${product.productName}`
    );
    if (agree) {
      axios({
        method: "DELETE",
        url: `http://localhost:5000/seller-product-delete/${product._id}`,
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
            {MyProduct.length > 0 ? (
              <>
                <h1 className="text-center mb-5">My Product</h1>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Product Name</th>
                      <th className="text-center">Category Name</th>
                      <th className="text-center">Sell Price</th>
                      <th className="text-center">Original Price</th>
                      <th className="text-center">Posted Time</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Advertisement</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MyProduct.map((product) => (
                      <tr key={product._id}>
                        <td className="text-center">{product.productName}</td>
                        <td className="text-center">{product.category}</td>
                        <td className="text-center">$ {product.sellPrice}</td>
                        <td className="text-center">
                          $ {product.originalPrice}
                        </td>
                        <td className="text-center">{product.postedTime}</td>
                        <td className="text-center">{product.status}</td>
                        <td className="text-center">
                          {product.addvertise === "true" &&
                          product.status !== "sold" ? (
                            <p>product is advertised</p>
                          ) : (
                            <>
                              {product.status === "sold" ? (
                                <></>
                              ) : (
                                <>
                                  {product.status !== "sold" &&
                                  product.addvertise !== "true" ? (
                                    <Button
                                      variant="outline-primary"
                                      onClick={() => handleAdd(product)}
                                    >
                                      Advertise
                                    </Button>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </td>
                        <td className="text-center">
                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(product)}
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

export default MyProduct;
