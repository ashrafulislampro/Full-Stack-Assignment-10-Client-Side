import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../AddEvents/Sidebar";
import "./ManageProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import editIcon from "../../images/Group 307.png";
import deleteIcon from "../../images/Group 33150.png";
const ManageProduct = () => {
  const [edit, setEdit] = useState(false);
  const [buyProducts, setBuyProducts] = useState([]);
  useEffect(() => {
    fetch("https://gentle-bayou-67475.herokuapp.com/allBuyProduct")
      .then((res) => res.json())
      .then((data) => setBuyProducts(data));
  }, []);

  const handleStatusBtn = (event, id) => {
      const status = event.target.value;
      const newStatus = {status, id};
      fetch(`https://gentle-bayou-67475.herokuapp.com/update/${id}`, {
        method: "PATCH",
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(newStatus)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          toast("Successfully added Action", {type: "success"})
        }
        else{
            toast("Failure to add Action", { type: "error"})
        }
      });
  }
  const handleEditButton = (id) => {
    const sameProduct = buyProducts.filter((product) => product._id === id)
    console.log("id", id)
    console.log("sameProduct", sameProduct[0]._id);
    if(id === sameProduct[0]._id){
      setEdit(true);
    }
    else{
      setEdit(false);
    }
  };

  const handleDeleteButton = (id) => {
    const process = window.confirm("Are You Sure To Delete This Product");
    if (process) {
      fetch(`https://gentle-bayou-67475.herokuapp.com/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            toast("Delete product successfully", { type: "success" });
            const remainingProducts = buyProducts?.filter(
              (data) => data?._id !== id
            );
            setBuyProducts(remainingProducts);
          } else {
            toast("Failed to delete product", { type: "error" });
          }
        });
    }
  };

  return (
    <section className="manage_section">
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3">
            <Sidebar></Sidebar>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-9">
            <h4 className="header_text">Manage Product</h4>
            <div className="form_content">
              <table className="table" border={1} cellSpacing={5}>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {buyProducts.map((item) => (
                    <tr key={item._id}>
                      <td className="table_data">
                        {item.newProduct.productName}
                      </td>
                      <td className="data">{item.newProduct.weight}</td>
                      <td className="data">{item.newProduct.price}</td>
                      <td className="d-flex">
                        <div className="d-flex">
                          <select onChange={(e)=> handleStatusBtn(e, `${item._id}`)} style={{display : edit ? "block" : "none"}} name="" id="">
                            <option value="pending">Pending</option>
                            <option value="onGoing">On going</option>
                            <option value="done">Done</option>
                          </select>
                          <img
                            onClick={() => handleEditButton(item._id)}
                            style={{display : edit ? "none" : "block", width: "30px", cursor: "pointer" }}
                            src={editIcon}
                            alt=""
                          />
                        </div>
                        <img
                          onClick={() => handleDeleteButton(item._id)}
                          style={{ width: "30px", cursor: "pointer" }}
                          src={deleteIcon}
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;
