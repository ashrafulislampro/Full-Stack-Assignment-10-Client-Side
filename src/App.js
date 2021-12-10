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
          <Route path="/registration">
          <Registration />
          </Route>
          <PrivateRoute path="/checkOut/:id">
          <CheckOut />
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/addEvents">
            <AddEvents />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
   </Router>
   </UserContext.Provider>
  );
}

export default App;
