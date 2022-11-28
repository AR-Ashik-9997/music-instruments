import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../utility/AuthProvider";
import useTitle from "../../utility/TitleHooks";

const SellerInformation = () => {
  useTitle("All Seller Info");
  const { Logout } = useContext(AuthContext);
  const notify = () => toast.success("Delete Successful.");
  const { data: sellerInfo = [], refetch } = useQuery({
    queryKey: ["sellerInfo"],
    queryFn: async () => {
      const res = await fetch("https://music-data-six.vercel.app/allseller?role=seller");
      const data = await res.json();
      return data;
    },
  });

  const handlevarify = (seller) => {
    const update = {
      verified: "true",
    };
    fetch(`https://music-data-six.vercel.app/varyfySeller/${seller._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("secret-token")}`,
      },
      body: JSON.stringify(update),
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          return Logout();
        }

        return response.json();
      })
      .then(() => {
        
      });
    fetch(`https://music-data-six.vercel.app/updateSeller/${seller.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("secret-token")}`,
      },
      body: JSON.stringify(update),
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          return Logout();
        }

        return response.json();
      })
      .then(() => {
        refetch()
      });
  };

  const handleDelete = (id) => {
    const agree = window.confirm(
      `Are you sure you want to delete: ${id.username}`
    );
    if (agree) {
      axios({
        method: "DELETE",
        url: `https://music-data-six.vercel.app/seller-info-delete/${id._id}`,
      })
        .then((response) => console.log(response.data))
        .then(() => {
          notify();
          refetch();
        });
    }
  };
  return (
    <Container className="pb mt-5">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="mt-5 mb-5">
            {sellerInfo.length > 0 ? (
              <>
                <h1 className="text-center mb-5">All Seller Information</h1>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Photo</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Varifyed</th>
                      <th className="text-center">Acion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerInfo.map((seller) => (
                      <tr key={seller._id}>
                        <td className="text-center">
                          <img
                            src={seller.photo}
                            className="order-image"
                            alt=""
                          />
                        </td>
                        <td className="text-center">{seller.username}</td>
                        <td className="text-center">{seller.email}</td>
                        <td className="text-center">
                          {seller.verified === "true" ? (
                            <>
                              <p>verified</p>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="outline-primary"
                                onClick={() => handlevarify(seller)}
                              >
                                Varify
                              </Button>
                            </>
                          )}
                        </td>
                        <td className="text-center">
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
