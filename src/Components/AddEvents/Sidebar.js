import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import magIcons from "../../images/grid 1.png";
import plusIcons from "../../images/plus 1.png";
import editIcons from "../../images/edit 1.png";
import logout from "../../images/logout.png";
const Sidebar = () => {
  return (
    <section className="sidebar_section d-flex flex-column justify-content-between">
      <ul className="list-unstyled ">
        <h2 className="logo_text py-4 ms-5 mb-2">
          Fresh Valley
        </h2>
        <li>
          <Link className="text-white" to="/manageProduct">
            <p>
              <img style={{width: "30px", marginRight: "5px"}} src={magIcons} alt="" />
              <span>Manage Product</span>
            </p>
          </Link>
        </li>
        <li>
          <Link className="text-white" to="/addEvents">
            <p>
              <img style={{width: "30px", marginRight: "5px"}} src={plusIcons} alt="" />
              <span>Add Product</span>
            </p>
          </Link>
        </li>
        <li>
          <Link className="" to="/makeAdmin">
            <p>
              <img style={{width: "30px", marginRight: "5px"}} src={editIcons} alt="" />
              <span>Make Admin</span>{" "}
            </p>
          </Link>
        </li>
      </ul>
      <div className="list-unstyled mb-5">
        <li>
          <Link className="text-white ms-5 text-decoration-none" to="/home">
            <img style={{width: "25px", marginRight: "5px"}} src={logout} alt="" />
            <span className="ms-2">Log Out</span>
          </Link>
        </li>
      </div>
    </section>
  );
};

export default Sidebar;
