import React, { useEffect, useState } from "react";
import Products from "../Products/Products";
import "./Home.css";
import Button from "react-bootstrap/Button";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://gentle-bayou-67475.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        if(data.length > 0) {
          toggleSpinner();
          setProducts(data)
        }
      });
  }, []);
  const toggleSpinner = () => {
    const spinner = document.getElementById('spinner_buffer')
    spinner.classList.toggle('d-none');
  }
  return (
    <div className="home_content">
    <div className="row">
      <div className="form_field col-sm-12 col-md-12 col-lg-12">
        <input type="search" placeholder="Search Products" name="" id="" className="ps-3"/>
        <Button className="buttons" type="search">
          Search
        </Button>
      </div>
      </div>
      <div className="row">
      <div id="spinner_buffer" className="d-flex justify-content-center d-done">
        <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
      </div>
        {products.map((pdItems) => (
          <Products product={pdItems} key={pdItems._id}></Products>
        ))}
      </div>
    </div>
  );
};

export default Home;
