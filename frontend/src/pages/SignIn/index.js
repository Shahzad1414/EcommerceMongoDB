import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "@mui/material";
import { useState } from "react";
import GoogleImg from "../../assets/images/google.png";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../firebase";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import { MyContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/users/userSlice";

// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email address is required"),
  password: yup.string().required("Password is Required"),
});

const SignIn = () => {
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const isSuccess = useSelector((state) => state.auth.isSuccess);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values)).then((result)=>{
        if (loginUser.fulfilled.match(result)) {
          // Redirect to the next page
          navigate('/'); // Replace '/next-page' with your desired route
      }
      
      })
     
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  // const signInWithGoogle=()=>{
  //     setShowLoader(true);
  //     signInWithPopup(auth, googleProvider)
  //     .then((result) => {

  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;

  //       setShowLoader(false);

  //       localStorage.setItem('isLogin',true);
  //       context.signIn();

  //       history('/');

  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // }

  return (
    <>
      <section className="signIn mb-5">
        <div class="breadcrumbWrapper">
          <div class="container-fluid">
            <ul class="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to="/">Home</Link>{" "}
              </li>
              <li>Sign In</li>
            </ul>
          </div>
        </div>

        <div className="loginWrapper">
          <div className="card shadow">

          {isLoading && (
              <Backdrop
                sx={{
                  color: "#000",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
                className="formLoader"
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}


            <h3>Sign In</h3>
            <form className="mt-4" action="" onSubmit={formik.handleSubmit}>
              <div className="form-group mb-4 w-100">
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  className="w-100"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                 <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
              </div>
             
              <div className="form-group mb-4 w-100">
                <div className="position-relative">
                  <TextField
                    id="password"
                    type={showPassword === false ? "password" : "text"}
                    name="password"
                    label="Password"
                    className="w-100"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                  />
                  <Button
                    className="icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword === false ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </Button>
                </div>
                <div className="error">
                {formik.touched.password && formik.errors.password}
              </div>
              </div>

              <div className="form-group mt-5 mb-4 w-100">
                <Button className="btn btn-g btn-lg w-100" type="submit">
                  Sign In
                </Button>
              </div>

              {/* <div className="form-group mt-5 mb-4 w-100 signInOr">
                <p className="text-center">OR</p>
                <Button
                  className="w-100"
                  variant="outlined"
                  onClick={signInWithGoogle}
                >
                  <img src={GoogleImg} />
                  Sign In with Google
                </Button>
              </div> */}

              <p className="text-center">
                Not have an account
                <b>
                  {" "}
                  <Link to="/signup">Sign Up</Link>
                </b>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
