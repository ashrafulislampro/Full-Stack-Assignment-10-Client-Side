import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./OrdersDetails.css";
const OrdersDetails = (props) => {
  const items = props.item;
  const { product } = items;
  const { productName, price, imageURL, wight } = product;
  console.log(product);
  return (
    <Container className="container">
      <Row className="ordersDetails_content mt-4">
        <Col xs={12} md={9} lg={9}>
          <img style={{ width: "110px", marginLeft: "5px"}} src={imageURL} alt="" />
          </Col>
        <Col xs={12} md={3} lg={3}>
          <h3>{productName}</h3>
          <p>Wight : {wight}</p>
          <p>Price : $ {price}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersDetails;
