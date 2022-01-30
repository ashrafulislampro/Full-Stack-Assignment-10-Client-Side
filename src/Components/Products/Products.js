import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Products.css";
const Products = (props) => {
  const products = props.product;
  const { productName, price, wight, imageURL, _id } = products;
  const history = useHistory();
  
  const handleButton = id => {
    history.push(`/checkOut/${id}`);
  }
 
  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div>
        <Card className="card_container">
          <Card.Img variant="top" className="img" src={imageURL} />
          <Card.Body>
            <Card.Title>
              <h5>
                {productName}- {wight}
              </h5>
            </Card.Title>
            <Card.Text className="text_content">
              <h4 className="text_price">$ {price}</h4>
              <Button onClick={()=> handleButton(_id)} className="buttons">Buy Now</Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Products;
