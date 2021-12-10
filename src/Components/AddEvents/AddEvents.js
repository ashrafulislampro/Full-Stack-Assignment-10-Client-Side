import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import magIcons from "../../images/grid 1.png";
import plusIcons from "../../images/plus 1.png";
import editIcons from "../../images/edit 1.png";
import "./AddEvents.css";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
const drawerWidth = 240;
const AddEvents = (props) => {
  const [imageURL, setImageURL] = useState(null);
  const {
    register,
    handleSubmit
  } = useForm();
  const onSubmit = (data) => {
    const productData = {
      productName: data.name,
      price : data.price,
      wight: data.wight,
      imageURL: imageURL,
    };
    fetch('http://localhost:5000/addProducts',{
      method: 'POST',
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify(productData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
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

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="menu_bar">
      <Toolbar>
        <h4>FRESH VALLEY</h4>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <p>
              <img src={magIcons} alt="" />
              <span>Manage Product</span>
            </p>
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <p>
              <img src={plusIcons} alt="" />
              <span>Add Product</span>
            </p>
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <p>
              <img src={editIcons} alt="" />
              <span>Edit Product</span>{" "}
            </p>
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Add Product
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Container className="form_container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form_content">
                  <Row>
                    <Col xs={12} md={12} lg={6}>
                      <label htmlFor="event-name">
                        Product Name
                        <br />
                        <input
                          className="form_input"
                          type="text"
                          {...register("name")}
                          id="event-name"
                          placeholder="Enter Name"
                        />
                      </label>
                    </Col>
                    <Col xs={12} md={12} lg={6}>
                      <label htmlFor="wight">
                        Wight
                        <br />
                        <input
                          className="form_input"
                          type="text"
                          {...register("wight")}
                          id="wight"
                          placeholder="Enter KG"
                        />
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12} lg={6}>
                      <label htmlFor="price">
                        Add Price
                        <br />
                        <input
                          className="form_input"
                          type="price"
                          {...register("price")}
                          id="price"
                          placeholder="Enter Price"
                        />
                      </label>
                    </Col>
                    <Col xs={12} md={12} lg={6}>
                      <label htmlFor="photo">
                        Add Photo
                        <br />
                        <input
                          className="form_input"
                          type="file"
                          {...register("photo")}
                          id="photo"
                          onChange={handleImageUpload}
                          placeholder="Upload Photo"
                        />
                      </label>
                    </Col>
                  </Row>
                </div>
                <input className="form_submit" type="submit" value="Save" />
              </form>
            </Container>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AddEvents;
