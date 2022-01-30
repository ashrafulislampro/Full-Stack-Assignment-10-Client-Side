import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import AddEvents from "./Components/AddEvents/AddEvents";
import CheckOut from "./Components/CheckOut/CheckOut";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Registration from "./Components/Registration/Registration";
import Orders from "./Components/Orders/Orders";
import NotFound from "./Components/NotFound/NotFound";
import Content from "./Components/NotFound/Content";
import ManageProduct from './Components/ManageProduct/ManageProduct';
import MakeAdmin from './Components/MakeAdmin/MakeAdmin';
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
   <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
   <Router>
   <Header/>
      <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/orders">
            <Orders/>
          </PrivateRoute>
          <PrivateRoute path="/manageProduct">
            <ManageProduct/>
          </PrivateRoute>
          <Route path="/registration">
          <Registration />
          </Route>
          <PrivateRoute path="/checkOut/:id">
            <CheckOut />
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/makeAdmin">
            <MakeAdmin />
          </PrivateRoute>
          <PrivateRoute path="/addEvents">
            <AddEvents />
          </PrivateRoute>
          <Route path="/deals">
            <Content />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
   </Router>
   </UserContext.Provider>
  );
}

export default App;
