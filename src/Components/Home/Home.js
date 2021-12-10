import React, { useEffect, useState } from "react";
import Products from "../Products/Products";
import "./Home.css";
import Button from "react-bootstrap/Button";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(" https://arcane-dusk-28190.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="home_content">
    <div>
      <div className="form_field">
        <input type="search" name="" id="" />
        <Button className="buttons" type="search">
          Search
        </Button>
      </div>
      </div>
      <div className="row">
        {products.map((pdItems) => (
          <Products product={pdItems} key={pdItems._id}></Products>
        ))}
      </div>
    </div>
  );
};

export default Home;
