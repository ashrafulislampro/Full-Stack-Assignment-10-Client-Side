import React from "react";
import Sidebar from "../AddEvents/Sidebar";
import { useForm } from "react-hook-form";
import "./MakeAdmin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MakeAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    fetch("https://gentle-bayou-67475.herokuapp.com/addAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((info) => {
        console.log(info);
        if(info){
          toast("Successfully added Admin", {type: "success"});
          document.getElementById('email').value = '';
        }
        else{
          toast("Failure add Admin", {type: "error"});
        }
      });
  };

  return (
    <section className="update_section">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3">
            <Sidebar></Sidebar>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-9">
            <h4 className="header_text">Add Admin</h4>
            <div className="form_content">
              <form
                className="form_content_role"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <input
                    className="form-control form_admin"
                    type="email"
                    id="email"
                    placeholder="Enter Admin Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span style={{color: "red"}}>This field is required</span>}
                </div>
                <button className="admin_btn" type="submit" value="Add Admin">
                  Add Admin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAdmin;
