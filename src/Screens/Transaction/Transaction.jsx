import React, { useEffect, useState } from "react";
import DahboardNav from "../../components/DahboardNav/DahboardNav";
import { account } from "../../Assets/data/enums";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
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
  const [isStatmentPressed, setIsStatementPressed] = useState(false);

  const [account, setAccount] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

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
        alert(error);
        console.log(error);
      });
  }, []);

  const getStatement = () => {
    axios
      .get(`http://localhost:8082/customer/transaction/export`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "arraybuffer", // Set the response type to arraybuffer
      })
      .then((res) => {
        console.log(res);
        const base64Data = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setPdfData(base64Data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addBalanceValues = {
    username: "",
    amount: "",
  };

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

  const validationSchemaCreateTrans = Yup.object({
    email: Yup.string()
      .required("Please enter your email id")
      .email("An email does not look like this"),
    accountNumber: Yup.string().required("Please enter an account number"),
  });

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
      setIsSubmitDisabled(true);
      axios
        .put("http://localhost:8082/customer/transaction/deposit", values, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsSubmitDisabled(false);
          console.log(res.data);
          toast.success(res.data);
        })
        .catch((error) => {
          setIsSubmitDisabled(false);
          console.log(error);
          alert(`${error.response.data}`);
        });
    },
    validationSchema: validationSchemaAddBalance,
  });

  const formikWithdrawBalance = useFormik({
    initialValues: addBalanceValues,
    onSubmit: (values) => {
      const token = localStorage.getItem("token");
      setIsSubmitDisabled(true);
      axios
        .put("http://localhost:8082/customer/transaction/withdraw", values, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsSubmitDisabled(false);
          toast.success(res.data);
          formikWithdrawBalance.resetForm();
        })
        .catch((error) => {
          setIsSubmitDisabled(false);
          console.log(error);
          alert(`${error.name}: ${error.message}`);
        });
    },
    validationSchema: validationSchemaAddBalance,
  });

  return (
    <div className="image">
      <div>
        <Button
          variant={isAddBalancePressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsAddBalancePressed(true);
            setIsWithBalancePressed(false);
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
          variant={isWithBalancePressed === true ? "contained" : "outlined"}
          onClick={getStatement}
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
          Statement
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
                      variant="outlined"
                      color="primary"
                      type="submit"
                      startIcon={<PersonAdd />}
                    >
                      {" "}
                      Create{" "}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => formikAddBalance.resetForm()}
                    >
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
                      label="Amount"
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
                      variant="outlined"
                      color="primary"
                      type="submit"
                      startIcon={<PersonAdd />}
                    >
                      {" "}
                      Create{" "}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => formikWithdrawBalance.resetForm()}
                    >
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
