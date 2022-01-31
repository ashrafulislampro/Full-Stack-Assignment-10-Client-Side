import React from "react";
import "./OrdersDetails.css";

const OrdersDetails = (props) => {
  const items = props.item;
  const { newProduct } = items;
  const { productName, imageURL, status } = newProduct;
  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      
        <div class="card shadow my-2" style={{ width: "16rem", margin: "auto" }}>
          <img
            style={{ height: "50%", width: "50%", margin: "auto" }}
            src={imageURL}
            className="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 className="card-title text-center">{productName}</h5>
            <button className="btn btn-primary">{status}</button>
          </div>
        </div>
    </div>
  );
};

export default OrdersDetails;
