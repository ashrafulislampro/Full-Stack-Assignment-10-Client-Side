import { initializeApp } from "@firebase/app";
import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import "./Login.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
} from "firebase/auth";
import fbLogo from "../../images/Group 2.png";
import gLogo from "../../images/Group 573.png";
import firebaseConfig from "./firebase-config";
import { Zoom } from 'react-reveal';

const Login = () => {
  const app = initializeApp(firebaseConfig);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
  });

  const handleFormSubmit = (e) => {
    if (loggedInUser.email && loggedInUser.password) {
      const auth = getAuth(app);
      signInWithEmailAndPassword(
        auth,
        loggedInUser.email,
        loggedInUser.password
      )
        .then((userCredential) => {
          const newUserInfo = { ...userLog };
          newUserInfo.success = true;
          setUserLog(newUserInfo);
          storeAuthToken();
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...userLog };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUserLog(newUserInfo);
        });
    }
    e.preventDefault();
  };
  //  google sign in method
  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const newUserInfo = { name: displayName, email };
        setLoggedInUser(newUserInfo);
        storeAuthToken();
        history.replace(from);
      })
      .catch((error) => {
        const newUserInfo = { ...userLog };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUserLog(newUserInfo);
      });
  };

  // facebook sign in method
  const handleFacebookSignIn = () => {
    const facebookProvider = new FacebookAuthProvider();

    const auth = getAuth(app);
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const newUserInfo = { name: displayName, email };
        setLoggedInUser(newUserInfo);
        storeAuthToken();
        history.replace(from);
      })
      .catch((error) => {
        const newUserInfo = { ...userLog };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUserLog(newUserInfo);
      });
  };

  //   verify id token
  const storeAuthToken = () => {
    const auth = getAuth(app);
    auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        console.log(idToken);
        sessionStorage.setItem("token", idToken);
        history.replace(from);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <Zoom>
      <div className="form_container">
        <form className="ship_form" onSubmit={handleFormSubmit}>
          <h3>Log in account</h3>
          <input type="email" name="email" placeholder="Your Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <input type="submit" value="Logged In" />
          <p>
            Don't have an account ?
            <Link to="/registration">Create an account</Link>
          </p>
          {userLog.success && (
            <p style={{ color: "green" }}>User logged in successfully</p>
          )}
          {userLog.error && (
            <p style={{ color: "red" }}>The email is already used.</p>
          )}
        </form>
      </div>
      <p className="text-center">or</p>
      <button onClick={handleFacebookSignIn} className="btns">
        <img className="icon" src={fbLogo} alt="" />
        <span>continue with facebook</span>
      </button>
      <button onClick={handleGoogleSignIn} className="btns">
        <img className="icon" src={gLogo} alt="" />{" "}
        <span>continue with google</span>
      </button>
      </Zoom>
    </div>
  );
};

export default Login;
