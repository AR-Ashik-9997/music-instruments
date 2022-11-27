import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { v4 } from "uuid";
import { AuthContext } from "../../utility/AuthProvider";
import axios from "axios";
const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const handleImage = (event) => {
    const img = event.target.files[0];
    const formData = new FormData();
    formData.append("image", img);
    const url = "https://api.imgbb.com/1/upload?key=d8712d7ded066028fa6b90dd33cb71cf";
    fetch(url, {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
            .then(imgData=>{
              if(imgData.success){
                setImageUrl(imgData.data.url);
              }
            });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const geneatedId = v4();
    const form = event.target;
    const productName = form.name.value;
    const image=imageUrl;
    const phone = form.phone.value;
    const sellPrice = form.sellPrice.value;
    const condition = form.condition.value;
    const location = form.location.value;
    const category = form.category.value;
    const originalPrice = form.originalPrice.value;
    const description = form.description.value;
    const used = form.used.value;
    const currentTime = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    fetch(`http://localhost:5000/all-Category-data-find?name=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.name === category) {
          axios({
            method: "post",
            url: "http://localhost:5000/AddProduct",
            data: {
              email: user.email,
              sellarName: user.displayName,
              categoryId: data.categoryId,
              productName: productName,
              image: image,
              phone: phone,
              sellPrice: sellPrice,
              condition: condition,
              location: location,
              category: category,
              originalPrice: originalPrice,
              description: description,
              used: used,
              postedTime: currentTime,
              status: "Available",
              addvertise: "false",
            },
          })
            .then((response) => console.log(response))
            .then({});
          form.reset();
        } else {
          axios({
            method: "post",
            url: "http://localhost:5000/AddProduct",
            data: {
              email: user.email,
              categoryId: geneatedId,
              productName: productName,
              image: imageUrl,
              phone: phone,
              sellPrice: sellPrice,
              condition: condition,
              location: location,
              category: category,
              originalPrice: originalPrice,
              description: description,
              used: used,
              postedTime: currentTime,
              status: "Available",
            },
          })
            .then((response) => console.log(response))
            .then({});
          axios({
            method: "post",
            url: "http://localhost:5000/AddCategory",
            data: {
              categoryId: geneatedId,
              name: category,
              image:imageUrl
            },
          })
            .then((response) => console.log(response))
            .then({});
          form.reset();
        }
      });
  };
  return (
    <div className="home-container">
      <Container className="top-margin">
        <Row>
          <Col lg={5} md={6} sm={12}>
            <div className="mt-5">
              <img
                src="https://simpleplans.com.au/img/content_writing-banner.png"
                alt=""
                className=" img-fluid"
              />
            </div>
          </Col>
          <Col lg={7} md={6} sm={12}>
            <div className="bg-white rounded-4 mx-auto mt-5 mb-5">
              <h1 className="text-center mb-4 pt-5">Add Product</h1>
              <Form className="mx-auto w-75" onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formBasicproductName">
                  <Form.Control
                    type="text"
                    className="rounded-3"
                    placeholder="Product Name"
                    name="name"
                    autoComplete="off"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicPhoto">
                  <Form.Control
                    name="image"
                    type="file"
                    className="rounded-3"
                    autoComplete="off"
                    onChange={handleImage}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicprice">
                  <Form.Control
                    name="sellPrice"
                    type="text"
                    placeholder="Sell Price"
                    className="rounded-3"
                    autoComplete="off"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicOption">
                  <Form.Select name="condition">
                    <option value="excellent">excellent</option>
                    <option value="good">good</option>
                    <option value="fair">fair</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicphone">
                  <Form.Control
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                    required
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasiclocation">
                  <Form.Select name="location">
                    <option value="Dhaka">Dhaka</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Sylhet">Sylhet</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCategory">
                  <Form.Select name="category">
                    <option value="Violin">Violin</option>
                    <option value="Saxophone">Saxophone</option>
                    <option value="Guitar">Guitar</option>
                    <option value="Harp">Harp</option>
                    <option value="Piano">Piano</option>
                    <option value="Drum Set">Drum Set</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicOriginalPrice">
                  <Form.Control
                    type="number"
                    placeholder="Original Price"
                    name="originalPrice"
                    required
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicYearofUsed">
                  <Form.Select name="used">
                    <option value="1 month">1 month</option>
                    <option value="2 month">2 month</option>
                    <option value="3 month">3 month</option>
                    <option value="4 month">4 month</option>
                    <option value="5 month">5 month</option>
                    <option value="6 month">6 month</option>
                    <option value="7 month">7 month</option>
                    <option value="8 month">8 month</option>
                    <option value="9 month">9 month</option>
                    <option value="10 month">10 month</option>
                    <option value="11 month">11 month</option>
                    <option value="12 month">12 month</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicDescription">
                  <textarea
                    name="description"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Your Description here...."
                    rows="3"
                    autoComplete="off"
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    variant="outline-info"
                    className="w-75 rounded-3 mb-5"
                  >
                    Add service
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddProduct;
