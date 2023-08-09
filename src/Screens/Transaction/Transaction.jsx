import React, { useEffect, useState } from "react";
import DahboardNav from "../../components/DahboardNav/DahboardNav";
import { account } from "../../Assets/data/enums";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Payment, PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import dashboardImage from "../../Assets/Images/dashboard.svg";
import axios from "axios";
import { Table } from "react-bootstrap";
import AccountDetails from "../../components/Dashboard/AccountDetails";
import { toast } from "react-toastify";

import "./Transaction.css";
import PDFViewer from "../../components/Dashboard/PDFViewer";

const Transaction = () => {
  let isAdmin = JSON.parse(localStorage.getItem("asAdmin"));

  const [isAddBalancePressed, setIsAddBalancePressed] = useState(true);
  const [isWithBalancePressed, setIsWithBalancePressed] = useState(false);
  const [isTransferPressed, setIsTransferPressed] = useState(false);

  const [account, setAccount] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  const [isAddBalanceDisabled, setAddBalanceDisabled] = useState(false);
  const [isWithBalanceDisabled, setWithBalanceDisabled] = useState(false);
  const [isTransferBalanceDisabled, setTranferBalanceDisabled] =
    useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8081/customer/account-details", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(`${res.data}`);
        setAccount(`${res.data}`);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  }, []);

  const addBalanceValues = {
    username: "",
    amount: "",
  };

  const validationSchemaAddBalance = Yup.object({
    username: Yup.string()
      .required("Please enter the account ID.")
      .min(3, "Please enter minimum of 3 character"),
    amount: Yup.number()
      .required("Please enter an amount you wish to deposit.")
      .min(0, "Please enter a positive value"),
  });

  const formikAddBalance = useFormik({
    initialValues: addBalanceValues,
    onSubmit: (values) => {
      const token = localStorage.getItem("token");
      setAddBalanceDisabled(true);
      axios
        .put("http://localhost:8082/customer/transaction/deposit", values, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAddBalanceDisabled(false);
          console.log(res.data);
          toast.success(res.data);
        })
        .catch((error) => {
          setAddBalanceDisabled(false);
          console.log(error);
          alert(`${error.response.data}`);
        });
    },
    validationSchema: validationSchemaAddBalance,
  });

  const formikWithdrawBalance = useFormik({
    initialValues: addBalanceValues,
    onSubmit: (values) => {
      setWithBalanceDisabled(true);
      const token = localStorage.getItem("token");
      axios
        .put("http://localhost:8082/customer/transaction/withdraw", values, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setWithBalanceDisabled(false);
          toast.error(res.data);
          formikWithdrawBalance.resetForm();
        })
        .catch((error) => {
          setWithBalanceDisabled(false);
          console.log(error);
          alert(`${error.name}: ${error.message}`);
        });
    },
    validationSchema: validationSchemaAddBalance,
  });

  const formikTransfer = useFormik({
    initialValues: {
      accno: "",
      ifsccode: "",
      username: "",
      amount: "",
    },
    onSubmit: (values) => {
      setTranferBalanceDisabled(true);
      console.log(values);
      axios
        .put(
          `http://localhost:8082/customer/transaction/bank-transfer`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setTranferBalanceDisabled(false);
          console.log(res.data);
          toast.success(res.data);
          formikTransfer.resetForm();
        })
        .catch((error) => {
          setTranferBalanceDisabled(false);
          console.log(error);
          toast.error(error);
        });
    },
  });

  return (
    <div className="image">
      <div>
        <Button
          variant={isAddBalancePressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsAddBalancePressed(true);
            setIsWithBalancePressed(false);
            setIsTransferPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "1rem",
            backgroundColor:
              isAddBalancePressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
          }}
        >
          Add Balance
        </Button>
        <Button
          variant={isWithBalancePressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsWithBalancePressed(true);
            setIsAddBalancePressed(false);
            setIsTransferPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "1rem",
            backgroundColor:
              isWithBalancePressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
            "&:active": {
              // transform: `translateY(${theme.spacing(-1)})`,
            },
          }}
        >
          Withdraw
        </Button>
        <Button
          variant={isTransferPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsAddBalancePressed(false);
            setIsWithBalancePressed(false);
            setIsTransferPressed(true);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "1rem",
            backgroundColor:
              isTransferPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
          }}
        >
          Bank Transfer
        </Button>
      </div>
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item alignSelf="center">
          {account && <AccountDetails account={account} />}
        </Grid>
        <Grid item>
          {isAddBalancePressed && (
            <Container
              maxWidth="sm"
              sx={{
                backgroundColor: "rgb(173, 2, 83)",
                borderRadius: "10px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Box
                component="form"
                noValidate
                className="mt-3 mb-3 p-5 pt-5"
                onSubmit={formikAddBalance.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="username"
                      variant="filled"
                      name="username"
                      label="Username"
                      value={formikAddBalance.values.username}
                      onChange={formikAddBalance.handleChange}
                      onBlur={formikAddBalance.handleBlur}
                      error={
                        formikAddBalance.touched.username &&
                        formikAddBalance.errors.username
                          ? true
                          : false
                      }
                      helperText={
                        formikAddBalance.touched.username &&
                        formikAddBalance.errors.username
                      }
                      InputProps={{
                        style: { color: "antiquewhite" },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="amount"
                      label="Amount"
                      value={formikAddBalance.values.amount}
                      onChange={formikAddBalance.handleChange}
                      onBlur={formikAddBalance.handleBlur}
                      error={
                        formikAddBalance.touched.amount &&
                        formikAddBalance.errors.amount
                          ? true
                          : false
                      }
                      helperText={
                        formikAddBalance.touched.amount &&
                        formikAddBalance.errors.amount
                      }
                      InputProps={{
                        style: { color: "antiquewhite" },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isAddBalanceDisabled}
                      startIcon={<PersonAdd />}
                    >
                      {" "}
                      Create{" "}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => formikAddBalance.resetForm()}
                    >
                      {" "}
                      Clear{" "}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setIsAddBalancePressed(false);
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

          {isWithBalancePressed && (
            <Container
              maxWidth="sm"
              sx={{
                backgroundColor: "rgb(173, 2, 83)",
                borderRadius: "10px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Box
                component="form"
                noValidate
                className="mt-3 mb-3 p-5 pt-5"
                onSubmit={formikWithdrawBalance.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="username"
                      id="username"
                      label="Username"
                      value={formikWithdrawBalance.values.username}
                      onChange={formikWithdrawBalance.handleChange}
                      onBlur={formikWithdrawBalance.handleBlur}
                      error={
                        formikWithdrawBalance.touched.username &&
                        formikWithdrawBalance.errors.username
                          ? true
                          : false
                      }
                      helperText={
                        formikWithdrawBalance.touched.username &&
                        formikWithdrawBalance.errors.username
                      }
                      InputProps={{
                        style: { color: "antiquewhite" },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="amount"
                      label="Amount"
                      value={formikWithdrawBalance.values.amount}
                      onChange={formikWithdrawBalance.handleChange}
                      onBlur={formikWithdrawBalance.handleBlur}
                      error={
                        formikWithdrawBalance.touched.amount &&
                        formikWithdrawBalance.errors.amount
                          ? true
                          : false
                      }
                      helperText={
                        formikWithdrawBalance.touched.amount &&
                        formikWithdrawBalance.errors.amount
                      }
                      InputProps={{
                        style: { color: "antiquewhite" },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<Payment />}
                    >
                      {isWithBalanceDisabled ? <CircularProgress /> : "Create"}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => formikWithdrawBalance.resetForm()}
                    >
                      {" "}
                      Clear{" "}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setIsWithBalancePressed(false);
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
          {isTransferPressed && (
            <Container
              maxWidth="sm"
              sx={{
                backgroundColor: "rgb(173, 2, 83)",
                borderRadius: "10px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Box
                component="form"
                noValidate
                className="mt-3 mb-3 p-5 pt-5"
                onSubmit={formikTransfer.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="accno"
                      id="accno"
                      label="Account Number"
                      value={formikTransfer.values.accno}
                      onChange={formikTransfer.handleChange}
                      onBlur={formikTransfer.handleBlur}
                      InputProps={{
                        style: { color: "antiquewhite" },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="amount"
                      label="Amount"
                      value={formikTransfer.values.amount}
                      onChange={formikTransfer.handleChange}
                      onBlur={formikTransfer.handleBlur}
                      InputProps={{
                        style: { color: "antiquewhite" },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="ifsccode"
                      label="IFSC Code"
                      value={formikTransfer.values.ifsccode}
                      onChange={formikTransfer.handleChange}
                      onBlur={formikTransfer.handleBlur}
                      InputProps={{
                        style: { color: "antiquewhite" },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="username"
                      label="Username"
                      value={formikTransfer.values.username}
                      onChange={formikTransfer.handleChange}
                      onBlur={formikTransfer.handleBlur}
                      InputProps={{
                        style: { color: "antiquewhite" },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isTransferBalanceDisabled}
                      startIcon={<Payment />}
                    >
                      {isTransferBalanceDisabled ? <CircularProgress /> : "Pay"}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => isTransferBalanceDisabled.resetForm()}
                    >
                      {" "}
                      Clear{" "}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setIsTransferPressed(false);
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
        </Grid>
      </Grid>
      <DahboardNav />
      {pdfData ? (
        <PDFViewer pdfData={pdfData} />
      ) : (
        <Typography variant="h6">Loading pdf</Typography>
      )}
    </div>
  );
};

export default Transaction;
