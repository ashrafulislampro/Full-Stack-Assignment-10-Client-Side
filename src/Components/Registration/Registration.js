import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../Login/firebase-config';
import { getAuth, createUserWithEmailAndPassword , signInWithPopup, updateProfile, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import fbLogo from '../../images/Group 2.png';
import gLogo from '../../images/Group 573.png';
import '../Login/Login.css';
const Registration = () => {
          const [loggedInUser, setLoggedInUser] = useContext(UserContext);
          const app = initializeApp(firebaseConfig);
          const history = useHistory();
          const location = useLocation();
          let { from } = location.state || { from: { pathname: "/" } };
          const [userInfo, setUserInfo] = useState({
                    email: '',
                    name: '',
                    password: '',
                    error: '',
                    success: '',
                    newUser: true
          })
          const handleBlurField = (e) => {
                    let isUserFormValid = true;
                    if (e.target.name === "name") {
                              isUserFormValid = e.target.value.length > 6;
                    }
                    if (e.target.name === "email") {
                              isUserFormValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value);
                    }
                    if (e.target.name === "password") {
                              isUserFormValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value);
                    }
                    if (isUserFormValid) {
                              const newUserInfo = { ...userInfo };
                              newUserInfo[e.target.name] = e.target.value;
                              setUserInfo(newUserInfo);
                    }
          }
          const handleFormSubmit = (e) => {

                    if (userInfo.newUser && userInfo.email && userInfo.password) {
                              const auth = getAuth(app);
                              createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
                                        .then((userCredential) => {
                                                  const newUserInfo = { ...userInfo };
                                                  newUserInfo.error = '';
                                                  newUserInfo.success = true;
                                                  setUserInfo(newUserInfo);
                                                  updateUserProfileName(userInfo.name);
                                                  setLoggedInUser(newUserInfo);
                                                  storeAuthToken();
                                                  history.replace(from);
                                        })
                                        .catch((error) => {
                                                  const newUserInfo = { ...userInfo };
                                                  newUserInfo.error = error.message;
                                                  newUserInfo.success = false;
                                                  setUserInfo(newUserInfo);
                                        });
                    }

                    e.preventDefault();
          }
          const updateUserProfileName = (name) => {
                    const auth = getAuth(app);
                    updateProfile(auth.currentUser, {
                              displayName: name
                    }).then(() => {
                              console.log('after sign in User profile updated')
                    }).catch((error) => {
                              console.log(error)
                    });
          }

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

                              }).catch((error) => {
                                        const newUserInfo = { ...userInfo };
                                        newUserInfo.error = error.message;
                                        newUserInfo.success = false;
                                        setUserInfo(newUserInfo);
                              });
          }

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
                                        const newUserInfo = { ...userInfo };
                                        newUserInfo.error = error.message;
                                        newUserInfo.success = false;
                                        setUserInfo(newUserInfo);
                              });
          }

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
                              <div className="form_container">
                                        <form className="ship_form" onSubmit={handleFormSubmit}>
                                                  <h3>Create an account</h3>
                                                  <input type="text" name="name" onBlur={handleBlurField} placeholder="Your Name" required />
                                                  <input type="email" onBlur={handleBlurField} name="email" placeholder="Your Email" required />
                                                  <input type="password" name="password" onBlur={handleBlurField} placeholder="Password" required />
                                                  <input type="password" name="confirm_password" onBlur={handleBlurField} placeholder="Confirm Password" required />
                                                  <input type="submit" value="Sign Up" />
                                                  <p>Already have an account?<Link to="/login">Login</Link></p>
                                        </form>
                                        {
                                                  userInfo.error && <p style={{ color: 'red' }}>The email is already used.</p>
                                        }
                                        {
                                                  userInfo.success && <p style={{ color: 'green' }}>User created successfully</p>
                                        }

                              </div>
                              <p className="text-center">or</p>
                              <button onClick={handleFacebookSignIn} className="btns"><img className="icon" src={fbLogo} alt="" /><span>continue with facebook</span></button>
                              <button onClick={handleGoogleSignIn} className="btns"><img className="icon" src={gLogo} alt="" /> <span >continue with google</span></button>
                    </div>
          );
};

export default Registration;