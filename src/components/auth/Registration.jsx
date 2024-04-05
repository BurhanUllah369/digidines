import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../../api/api";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .max(24, "Username must not exceed 24 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must not exceed 24 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{8,24}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string()
    .matches(
      /^\+971(?:\d ?){6,14}\d$/,
      "Invalid phone number. Please enter a valid UAE phone number starting with +971"
    )
    .required("Phone number is required"),
});

const initialValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const Register = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [userRegistered, setUserRegistered] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, {
        username: values.username,
        email: values.email,
        password: values.password,
        phone_number: values.phone,
      });

      localStorage.setItem("email", values.email);

      setUserRegistered(true);
      setErrorMessage("");

      navigate("/verify-otp");

      resetForm();
    } catch (error) {
      const res = JSON.parse(error.request.response);
      let err = "";
      for (let [key, value] of Object.entries(res)) {
        err += value[0] + "\n";
      }
      setErrorMessage(err);

      // resetForm();
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 pt-12">
      <div className="container w-11/12 md:w-1/2 lg:w-2/5 mx-auto p-4 md:p-12 sm:bg-white sm:shadow-lg rounded-lg">
        <h1 className="mb-6 text-xl sm:text-3xl text-center font-bold">
          Register Account
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className={`mt-1 block w-full p-2 border-2 border-gray-200 rounded-md ${
                    errors.email && touched.email && "border-red-500"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className={`mt-1 block w-full p-2 border-2 border-gray-200 rounded-md ${
                    errors.username && touched.username && "border-red-500"
                  }`}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className={`mt-1 block w-full p-2 border-2 border-gray-200 rounded-md ${
                    errors.password && touched.password && "border-red-500"
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={`mt-1 block w-full p-2 border-2 border-gray-200 rounded-md ${
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    "border-red-500"
                  }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phone"
                  className={`mt-1 block w-full p-2 border-2 border-gray-200 rounded-md ${
                    errors.phone && touched.phone && "border-red-500"
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {userRegistered ? (
                <Link to="/verify-otp">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-mainColor text-white rounded-md hover:bg-buttonHoverColor focus:outline-none focus:ring focus:ring-mainCobg-mainColor"
                  >
                    Submit
                  </button>
                </Link>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-mainColor text-white rounded-md hover:bg-buttonHoverColor focus:outline-none focus:ring focus:ring-mainCobg-mainColor"
                >
                  Submit
                </button>
              )}
            </Form>
          )}
        </Formik>
        {errorMessage && (
          <pre className="text-red-500 mt-2">{errorMessage}</pre>
        )}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Already have an account? Login here
          </Link>
        </div>
      </div>
      <br /><br />
    </div>
  );
};

export default Register;
