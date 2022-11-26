import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const ReportedInfo = () => {
  const notify = () => toast.success("Delete Successful.");
  const { data: reported = [], refetch } = useQuery({
    queryKey: ["reported"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reportInfo");
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (report) => {
    const agree = window.confirm(
      `Are you sure you want to delete: ${report.product}`
    );
    if (agree) {
      axios({
        method: "DELETE",
        url: `http://localhost:5000/report-info-delete/${report._id}`,
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
            {reported.length > 0 ? (
              <>
                <h1 className="text-center mb-5">Reported Information</h1>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Category Name</th>
                      <th className="text-center">Product Name</th>
                      <th className="text-center">Acion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reported.map((report) => (
                      <tr>
                        <td className="text-center">{report.username}</td>
                        <td className="text-center">{report.email}</td>
                        <td className="text-center">{report.category}</td>
                        <td className="text-center">{report.product}</td>
                        <td className="text-center">
                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(report)}
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
export default ReportedInfo;
