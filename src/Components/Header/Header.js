import React, { useContext, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../../images/Group 33072.png";
import icons from "../../images/Avatar face.png";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [admin, setAdmin] = useState(false);
  const history = useHistory();
  const handleLoginButton = () => {
    history.push("/login");
  };

  useEffect(()=> {
    fetch("https://gentle-bayou-67475.herokuapp.com/admin",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email : loggedInUser.email})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data){
        toast("Logged in an Admin", {type : "success"});
        setAdmin(true);
      }
    })
  }, [loggedInUser.email])
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <ToastContainer/>
        <Navbar.Brand href="#">
          <img className="navbar_img" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end navbarScroll">
          <Nav
            className="me-5 my-5  my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              {" "}
              <Link className="nav_link" to="/home">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link className="nav_link" to="/orders">
                Orders
              </Link>
            </Nav.Link>
            {admin && (
              <NavDropdown title="Admin" id="dropdown_menu">
                <NavDropdown.Item>
                  <Link style={{ textDecoration: "none" }} to="/manageProduct">
                    Manage Product
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link style={{ textDecoration: "none" }} to="/addEvents">
                    AddProduct
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link style={{ textDecoration: "none" }} to="/makeAdmin">
                    Make Admin
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link> </Nav.Link>
            <Nav.Link>
              {" "}
              <Link className="nav_link" to="/deals">
                Deals
              </Link>
            </Nav.Link>
          </Nav>

          {loggedInUser.name ? (
            <img style={{ width: "50px" }} src={icons} alt="" />
          ) : (
            <Button
              onClick={handleLoginButton}
              variant="contained"
              className="button"
            >
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
