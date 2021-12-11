import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./Products.css";
const Products = (props) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const products = props.product;
  const { productName, price, wight, imageURL } = products;
  const history = useHistory();
  
  const handleButton = product => {
    const newUserInfo = {...loggedInUser, product};
    fetch('https://gentle-bayou-67475.herokuapp.com/addBuy',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newUserInfo)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    history.push(`/checkOut/${product._id}`);
  }
  return (
    <div className="col-md-4">
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
              <Button onClick={()=> handleButton(products)} className="buttons">Buy Now</Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Products;
