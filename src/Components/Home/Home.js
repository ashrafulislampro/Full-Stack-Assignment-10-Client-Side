import React, { useEffect, useState } from "react";
import Products from "../Products/Products";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetch("https://gentle-bayou-67475.herokuapp.com/products?search=" + search)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.length > 0) {
          toggleSpinner();
          setProducts(data)
        }else{
          toast("Search Correct Word With First Letter Capital", {type: 'error'});
        }
      });
  }, [search]);
  const toggleSpinner = () => {
    const spinner = document.getElementById('spinner_buffer')
    spinner.classList.toggle('d-none');
  }
  const handleSubmit = (e) => {
    const value = document.getElementById('productName').value;
    setSearch(value);
    document.getElementById('productName').value= '';
    e.preventDefault();
  }
  return (
    <div className="container">
    <ToastContainer/>
    <div className="row d-flex justify-content-center">
      <form className="form_container_role" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search Products" name="" id="productName" className="form-control search_input"/>
        <Button className="btn search-buttons" type="submit">
          Search
        </Button>
      </form>
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
