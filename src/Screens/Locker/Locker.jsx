import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { lockerSizes, lockerTypes } from "../../Assets/data/enums";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import dashboardImage from "../../Assets/Images/dashboard.svg";

import "./Locker.css";
import { toast } from "react-toastify";
import Lockers from "../../components/Dashboard/Lockers";
import PayLocker from "./PayLocker";

const Locker = () => {
  const [selectedButton, setSelectedButton] = useState(false);
  const [isReserveLockerPressed, setIsReserveLockerPressed] = useState(true);
  const [isPayPressed, setIsPayPressed] = useState(false);
  const [isSigninDisabled, setIsSigninDisabled] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/customer/home`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setName(res.data));
  }, []);

  const inititalValues = {
    email: "",
    lockertype: lockerTypes.Personal_Locker,
    lockersize: lockerSizes.SMALL,
    lockerlocation: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please enter your Email Address")
      .email("This is not how an Email Address looks like"),
  });

  const postLockerData = (values) => {
    setIsSigninDisabled(true);
    axios
      .post("http://localhost:8084/customer/locker/apply-for-locker", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data);
        formik.resetForm();
        setIsSigninDisabled(false);
      })
      .catch((res) => {
        toast.error("Something went wrong! Please try again.", res);
        formik.resetForm();
        setIsSigninDisabled(false);
      });
  };

  const formik = useFormik({
    initialValues: inititalValues,
    onSubmit: (values) => postLockerData(values),
    validationSchema: validationSchema,
  });

  return (
    <div className={isReserveLockerPressed ? "lockerimage" : ""}>
      <div>
        <Typography color="black" variant="h5" className="mt-5 mb-3">
          {name}
        </Typography>
      </div>
      <Button
        variant={isReserveLockerPressed === true ? "contained" : "outlined"}
        onClick={() => {
          setIsReserveLockerPressed(true);
          setIsPayPressed(false);
        }}
        sx={{
          border: "2px solid #870040",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          marginRight: "8px",
          color: "black",
          fontSize: "1rem",
          backgroundColor:
            isReserveLockerPressed === true ? "antiquewhite" : "inherit",
          "&:hover": {
            border: "none",
          },
        }}
      >
        Reserve a locker
      </Button>
      <Button
        variant={isPayPressed === true ? "contained" : "outlined"}
        onClick={() => {
          setIsReserveLockerPressed(false);
          setIsPayPressed(true);
        }}
        sx={{
          border: "2px solid #870040",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          marginRight: "8px",
          color: "black",
          fontSize: "1rem",
          backgroundColor: isPayPressed === true ? "antiquewhite" : "inherit",
          "&:hover": {
            border: "none",
          },
        }}
      >
        Pay
      </Button>
      {isReserveLockerPressed && (
        <Container
          maxWidth="sm"
          className="mb-5"
          sx={{
            marginTop: "-2rem",
            marginBottom: "1rem",
            backgroundColor: "rgba(173, 2, 83, 1)",
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  variant="filled"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="lockertypes-label" sx={{ color: "white" }}>
                    Locker Type
                  </InputLabel>
                  <Select
                    labelId="lockersize-label"
                    id="lockertype"
                    name="lockertype"
                    value={formik.values.lockertype}
                    onChange={formik.handleChange}
                    inputProps={{
                      style: { color: "white" },
                    }}
                  >
                    {Object.values(lockerTypes).map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="lockersize-label" sx={{ color: "white" }}>
                    Locker Size
                  </InputLabel>
                  <Select
                    labelId="lockersize-label"
                    id="lockersize"
                    name="lockersize"
                    value={formik.values.lockersize}
                    onChange={formik.handleChange}
                    inputProps={{
                      style: { color: "white" },
                    }}
                  >
                    {Object.values(lockerSizes).map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  variant="filled"
                  name="lockerlocation"
                  label="Location"
                  value={formik.values.lockerlocation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSigninDisabled}
                  startIcon={<PersonAdd />}
                >
                  {isSigninDisabled ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "Reserve"
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<ClearIcon />}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setSelectedButton(false);
                    setIsReserveLockerPressed(false);
                  }}
                >
                  {" "}
                  Cancel{" "}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
      {isPayPressed && <PayLocker />}
      <Lockers />

      {isReserveLockerPressed == false && (
        <img src={dashboardImage} alt="Dashboard image" />
      )}
    </div>
  );
};

export default Locker;
