import React, { useEffect, useState } from "react";
import Products from "../Products/Products";
import "./Home.css";
import Button from "react-bootstrap/Button";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://gentle-bayou-67475.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="home_content">
    <div className="row">
      <div className="form_field col-sm-12 col-md-12 col-lg-12">
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
