import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import dashboardImage from "../../Assets/Images/dashboard.svg";
import { account } from "../../Assets/data/enums";
import "./Loan.css";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loans from "../../components/Dashboard/Loans";
import PayLoan from "../../components/Loan/PayLoan";

const tableStyle = {
  minWidth: "650px",
  borderCollapse: "collapse",
};

const cellStyle = {
  border: "1px solid black",
  padding: "8px",
};

const headerCellStyle = {
  ...cellStyle,
  backgroundColor: "lightgray",
};
const Loan = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isCreateLoanPressed, setIsCreateLoanPressed] = useState(true);
  const [isSigninDisabled, setIsSigninDisabled] = useState(false);
  const [isPayLoanPressed, setPayLoanPressed] = useState(false);

  const initialValues = {
    username: "",
    loantype: "",
    loanamount: "",
    duration: "",
  };

  const postUserLoan = (values) => {
    setIsSigninDisabled(true);
    const valuesWithId = {
      ...values,
      id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 999999,
    };
    console.log("valuesWithId: ", valuesWithId);
    axios
      .post("http://localhost:8083/customer/loan/apply-loan", values, {
        headers: {
          "Content-Type": "application.json",
        },
      })
      .then((res) => {
        setIsSigninDisabled(false);
        console.log("response", res.data);
        toast.success(res.data);
      });
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your Username"),
    loanamount: Yup.string().required("Please enter an amount you wish"),
    loantype: Yup.string().required("Please enter the purpose of your loan"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      setIsSigninDisabled(true);
      axios
        .post("http://localhost:8083/customer/loan/apply-loan", values, {
          headers: {
            "Content-Type": "application/json",
            Accepts: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setIsSigninDisabled(false);
          toast.success(res.data);
          formik.resetForm();
        })
        .catch((error) => {
          setIsSigninDisabled(false);
          console.log(error);
          toast.error(error);
        });
    },
    validationSchema: validationSchema,
  });

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  return (
    <div className={isCreateLoanPressed ? "loanimage" : ""}>
      <Button
        variant={isCreateLoanPressed === true ? "contained" : "outlined"}
        onClick={() => {
          // handleButtonClick(1);
          setIsCreateLoanPressed(true);
          setPayLoanPressed(false);
        }}
        sx={{
          border: "2px solid #870040",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          marginRight: "8px",
          color: "black",
          fontSize: "1rem",
          backgroundColor:
            isCreateLoanPressed === true ? "antiquewhite" : "inherit",
          "&:hover": {
            border: "none",
          },
        }}
      >
        Apply for Loan
      </Button>

      <Button
        variant={isPayLoanPressed === true ? "contained" : "outlined"}
        onClick={() => {
          setIsCreateLoanPressed(false);
          setPayLoanPressed(true);
        }}
        sx={{
          border: "2px solid #870040",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          marginRight: "8px",
          color: "black",
          fontSize: "1rem",
          backgroundColor:
            isPayLoanPressed === true ? "antiquewhite" : "inherit",
          "&:hover": {
            border: "none",
          },
        }}
      >
        Pay EMI
      </Button>
      {isCreateLoanPressed && (
        <Container
          maxWidth="sm"
          sx={{
            marginTop: "-2rem",
            marginBottom: "1rem",
            backgroundColor: "rgb(173, 2, 83)",
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
                  name="username"
                  label="User Name"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && formik.errors.username
                      ? true
                      : false
                  }
                  helperText={formik.touched.username && formik.errors.username}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  variant="filled"
                  name="loantype"
                  label="Loan type"
                  value={formik.values.loantype}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && formik.errors.loantype
                      ? true
                      : false
                  }
                  helperText={formik.touched.username && formik.errors.username}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  variant="filled"
                  name="loanamount"
                  label="Amount"
                  value={formik.values.loanamount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.loanamount && formik.errors.loanamount
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.loanamount && formik.errors.loanamount
                  }
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  variant="filled"
                  name="duration"
                  label="Duration"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.duration && formik.errors.duration
                      ? true
                      : false
                  }
                  helperText={formik.touched.duration && formik.errors.duration}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  disabled={isSigninDisabled}
                >
                  {isSigninDisabled ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="outlined" color="warning" type="reset">
                  {" "}
                  Clear{" "}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    handleButtonClick(0);
                    setIsCreateLoanPressed(false);
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

      {isPayLoanPressed && <PayLoan />}
      <Loans />
      {isCreateLoanPressed == false && (
        <img src={dashboardImage} alt="Dashboard image" />
      )}
    </div>
  );
};
export default Loan;
