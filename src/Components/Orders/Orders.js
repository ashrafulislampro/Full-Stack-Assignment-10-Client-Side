import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import OrdersDetails from "./OrdersDetails";
import './Orders.css';
const Orders = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orderInfo, setOrderInfo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/buyProducts?email=" + loggedInUser.email)
      .then((res) => res.json())
      .then((data) => setOrderInfo(data));
  }, [loggedInUser.email]);
  console.log(orderInfo);
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

      {orderInfo.map((item) => (
        <OrdersDetails item={item} key={item._id}></OrdersDetails>
      ))}
    </div>
  );
};

export default Orders;