import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import OrdersDetails from "./OrdersDetails";
import "./Orders.css";
import { Bounce } from 'react-reveal';
const Orders = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    fetch(
      "https://gentle-bayou-67475.herokuapp.com/buyProducts?email=" +
        loggedInUser.email,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toggleSpinner();
          setOrderInfo(data);
        }
      });
  }, [loggedInUser.email]);

  const toggleSpinner = () => {
    const spinner = document.getElementById('spinner_buffer')
    spinner.classList.toggle('d-none');
  };

  return (
    <div className="container">
      <div className="order">
        <div>
          <h2>Order Summary</h2>
        </div>
        <div id="name_content">
          <h2>{loggedInUser.name}</h2>
          <p>{loggedInUser.email}</p>
        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <div
          id="spinner_buffer"
          className="d-flex justify-content-center d-done"
        >
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Bounce>
        <div className="row justify-content-between">
          {orderInfo.map((item) => (
            <OrdersDetails item={item} key={item._id}></OrdersDetails>
          ))}
        </div>
        </Bounce>
      </div>
    </div>
  );
};

export default Orders;
