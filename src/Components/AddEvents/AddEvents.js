import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddEvents.css";
import axios from "axios";
import Sidebar from "./Sidebar";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upload_img from '../../images/cloud-upload-outline 1.png';
const AddEvents = (props) => {
  const [imageURL, setImageURL] = useState(null);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const productData = {
      productName:data.name,
      price:data.price,
      wight:data.wight,
      imageURL:imageURL,
    };
    fetch("https://gentle-bayou-67475.herokuapp.com/addProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((info) => {
        console.log(info);
        if(info){
          toast("Successfully added this product", {type: "success"});
          document.getElementById("event-name").value = "";
          document.getElementById("weight").value = "";
          document.getElementById("price").value = "";
        }
        else{
          toast("Failure add this product", {type: "error"});
        }
      });
    console.log(productData);
  };

  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "cb2f23293e08c6ab301b0e0cbade3367");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <section className="container">
    <ToastContainer />
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
         <h3 className="header_text">Add Product</h3>
          <div className="form_content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="event-name">
                Product Name
                <br />
                <input
                  className="form-control form_input"
                  type="text"
                  {...register("name")}
                  id="event-name"
                  required
                  placeholder="Enter Product Name"
                />
              </label>
              <br />
              <label htmlFor="wight">
                Weight
                <br />
                <input
                  className="form-control form_input"
                  type="text"
                  {...register("wight")}
                  id="weight"
                  required
                  placeholder="Enter Product Unit"
                />
              </label>
              <br />
              <label htmlFor="price">
                Add Price
                <br />
                <input
                  className="form-control form_input"
                  type="number"
                  {...register("price")}
                  id="price"
                  required
                  placeholder="Enter Product Price"
                />
              </label>
              <br />
              <label  className="upload_img" htmlFor="photo">
                Upload Product Image
                <br />
                  <input
                    type="file"
                    {...register("photo")}
                    id="photo"
                    required
                    onChange={handleImageUpload}
                    placeholder="Upload Photo"
                  />
                  <button className="btn upload_btn"><img style={{width : "22px", marginRight: "20px"}} src={upload_img} alt="" />Image</button>
              </label>
              <br />
              <input
                className="form_submit"
                type="submit"
                value="Save"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEvents;
