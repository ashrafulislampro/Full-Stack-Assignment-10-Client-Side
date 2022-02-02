import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../../App";

const CheckOut = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { id } = useParams();
  const [items, setItems] = useState({});

  useEffect(() => {
    fetch("https://gentle-bayou-67475.herokuapp.com/product/" + id)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [id]);

  console.log(items);
  const { productName, price, wight } = items;
  const history = useHistory();
  const handleCheckOut = (items) => {
    const newProduct = {
      productName: items.productName,
      weight: items.wight,
      price: items.price,
      status: 'Pending',
      imageURL: items.imageURL,
    };
    const newUserInfo = { ...loggedInUser, newProduct };
    fetch("https://gentle-bayou-67475.herokuapp.com/addBuy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    history.push("/orders");
  };

  return (
    <div className="container">
      <h2 style={{ fontWeight: "700", marginTop: "10px" }}>CheckOut</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{productName}</TableCell>
              <TableCell align="right">{1}</TableCell>
              <TableCell align="right">{wight}</TableCell>
              <TableCell align="right">{price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {items.productName && <Button
        onClick={() => handleCheckOut(items)}
        style={{ float: "right", marginTop: "10px" }}
        className="buttons"
      >
        CheckOut
      </Button>}
    </div>
  );
};

export default CheckOut;
