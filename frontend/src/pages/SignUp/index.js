import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "@mui/material";
import { useState } from "react";
import GoogleImg from "../../assets/images/google.png";

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/users/userSlice";
import * as yup from "yup";

const auth = getAuth(app);

// Define Yup schema for form validation
const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email address is required"),
  mobile: yup.string().required("Mobile is required"),
  password: yup.string().required("Password is required"),
});

const SignUp = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isSuccess = useSelector((state) => state.auth.isSuccess);
  const auth = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // State to store validation errors
  const [showPassword1, setShowPassword1] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    // conformPassword: ''
  });

  const signUp = async () => {
    try {
      // Validate form fields
      await schema.validate(formFields, { abortEarly: false });

      // Dispatch action to register user
      dispatch(registerUser(formFields));
      if(isSuccess==true){
        setFormFields({
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            password: ''
        });
        alert("Registered Successfully ")
        // Redirect to login page
        navigate("/signIn");
      }  

    } catch (error) {
      console.error("Validation error:", error);
      // Handle validation errors
      if (error.inner) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors); // Update validation errors state
      }
    }
  };

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormFields(() => ({
      ...formFields,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="signIn mb-5">
        <div class="breadcrumbWrapper res-hide">
          <div class="container-fluid">
            <ul class="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to="/">Home</Link>{" "}
              </li>
              <li>SignUp</li>
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

            <h3>SignUp</h3>
            <form className="mt-4">
              <div className="form-group mb-4 w-100">
                <TextField
                  id="firstname"
                  type="text"
                  name="firstname"
                  label="First Name"
                  className="w-100"
                  onChange={onChangeField}
                  value={formFields.firstname}
                />
              </div>
              <div className="validation-errors">
                {validationErrors.firstname && (
                  <p className="error-message">{validationErrors.firstname}</p>
                )}
              </div>
              <div className="form-group mb-4 w-100">
                <TextField
                  id="lastname"
                  type="text"
                  name="lastname"
                  label="Last Name"
                  className="w-100"
                  onChange={onChangeField}
                  value={formFields.lastname}
                />
              </div>
              <div className="validation-errors">
                {validationErrors.lastname && (
                  <p className="error-message">{validationErrors.lastname}</p>
                )}
              </div>
              <div className="form-group mb-4 w-100">
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  className="w-100"
                  onChange={onChangeField}
                  value={formFields.email}
                />
              </div>
              <div className="validation-errors">
                {validationErrors.email && (
                  <p className="error-message">{validationErrors.email}</p>
                )}
              </div>
              <div className="form-group mb-4 w-100">
                <TextField
                  id="mobile"
                  type="text"
                  name="mobile"
                  label="Mobile"
                  className="w-100"
                  onChange={onChangeField}
                  value={formFields.mobile}
                />
              </div>
              <div className="validation-errors">
                {validationErrors.mobile && (
                  <p className="error-message">{validationErrors.mobile}</p>
                )}
              </div>
              <div className="form-group mb-4 w-100">
                <div className="position-relative">
                  <TextField
                    id="password"
                    type={showPassword === false ? "password" : "text"}
                    name="password"
                    label="Password"
                    className="w-100"
                    onChange={onChangeField}
                    value={formFields.password}
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
                  <div className="validation-errors">
                    {validationErrors.password && (
                      <p className="error-message">
                        {validationErrors.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="conformPassword" type={showPassword1 === false ? 'password' : 'text'} name='conformPassword' label="Confirm Password" className='w-100' onChange={onChangeField}  value={formFields.conformPassword}/>
                                    <Button className='icon' onClick={() => setShowPassword1(!showPassword1)}>
                                        {
                                            showPassword1 === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
                                        }

                                    </Button>
                                </div>

                            </div> */}

              <div className="form-group mt-5 mb-4 w-100">
                <Button className="btn btn-g btn-lg w-100" onClick={signUp}>
                  Sign Up
                </Button>
              </div>

              <p className="text-center">
                Already have an account
                <b>
                  {" "}
                  <Link to="/signIn">Sign In</Link>
                </b>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
