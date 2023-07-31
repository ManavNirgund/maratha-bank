import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PersonAdd from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import { roles, genders } from "../../Assets/data/enums";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Register.css"

const EmployeeRegister = () => {
  const nav = useNavigate();
  const [isSignupDisabled, setIsSignupDisabled] = useState(false);

  const signup_url =
    "http://localhost:8081/customer/register";

  const formikValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
    phone: "",
  };

  const formikValidationSchema = Yup.object({
    username: Yup.string()
      .required("Please enter your name")
      .min(3, "Your First Name cannot be less than 3 characters")
      .max(15, "Your First Name cannot be greater than 15 characters"),
    email: Yup.string().required().email("Please enter your Email Address"),
    password: Yup.string()
      .required("Please choose a password")
      .min(8, "Your password must be at least 8 characters long")
      .oneOf([Yup.ref("confirmPassword"), null], "Passwords must match"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required()
      .min(10, "A phone number must be 10 digits")
      .max(13, "A phone number must be 10 digits"),
  });

  const formik = useFormik({
    initialValues: formikValues,
    validationSchema: formikValidationSchema,
    onSubmit: (values) => {
      setIsSignupDisabled(true);
      console.log(values);
      axios
        .post(signup_url, values, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
          },
        })
        .then((res) => {
          console.log(res.data);
          setIsSignupDisabled(false);
          nav("/signin");
        })
        .catch((error) => {
          alert(`${error}`);
          setIsSignupDisabled(false);
        });
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginBottom: "3rem",
        marginTop: "3rem",
        backgroundColor: "#870040",
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box
        component="form"
        noValidate
        className="mt-5 p-5 pt-5"
        onSubmit={formik.handleSubmit}
      >
        <Typography
          variant="h4"
          sx={{ marginTop: "-3rem", color: "white" }}
          align="center"
        >
          Customer Register
        </Typography>
        <Grid container spacing={2} className="mt-4">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={
                formik.touched.username && Boolean(formik.errors.username)
              }
              helperText={formik.touched.username && formik.errors.username}
              InputLabelProps={{
                style: { color: "black" },
              }}
              inputProps={{
                style: {
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              id="email"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputLabelProps={{
                style: { color: "black" },
              }}
              inputProps={{
                style: {
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              id="phoneNumber"
              name="phone"
              label="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={
                formik.touched.phone && Boolean(formik.errors.phone)
              }
              helperText={
                formik.touched.phone && formik.errors.phone
              }
              InputLabelProps={{
                style: { color: "black" },
              }}
              inputProps={{
                style: {
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              InputLabelProps={{
                style: { color: "black" },
              }}
              inputProps={{
                style: {
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputLabelProps={{
                style: { color: "black" },
              }}
              inputProps={{
                style: {
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputLabelProps={{
                style: { color: "black" },
              }}
              inputProps={{
                style: {
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSignupDisabled}
              startIcon={
                isSignupDisabled ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <PersonAdd />
                )
              }
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={formik.handleReset}
              color="error"
              startIcon={<DeleteIcon />}
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <Typography variant="body2" align="center" sx={{ color: "white" }}>
              Already have an account?{" "}
              <Link to="/signin" className="text-decoration-none">
                Sign In
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EmployeeRegister;