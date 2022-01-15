import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../images/Group 33072.png";
import icons from "../../images/Avatar face.png";
import './Header.css';
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const handleLoginButton = () => {
    history.push('/login');
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <img style={{ width: "300px" }} src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end navbarScroll">
          <Nav
            className="me-5 my-5  my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link> <Link className="nav_link" to="/home">Home</Link></Nav.Link>
            <Nav.Link> <Link className="nav_link" to="/Admin">Admin</Link></Nav.Link>
            <Nav.Link> <Link className="nav_link" to="/orders">Orders</Link></Nav.Link>
            <Nav.Link> <Link className="nav_link" to="/addEvents">AddProduct</Link></Nav.Link>
            <Nav.Link> <Link className="nav_link" to="/deals">Deals</Link></Nav.Link>
          </Nav>
          
          { 
            loggedInUser.name ? <img style={{ width: "50px" }} src={icons} alt="" />
            : <Button onClick={handleLoginButton} variant="contained" className='button'>Login</Button>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
