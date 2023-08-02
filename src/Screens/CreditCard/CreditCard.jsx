import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import dashboardImage from "../../Assets/Images/dashboard.svg";
// import { Table } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { creditCards } from "../../Assets/data/enums";
import axios from "axios";
import { toast } from "react-toastify";
import CreditCards from "../../components/Dashboard/CreditCards";

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

const CreditCard = () => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isApplyCreditPressed, setIsApplyCreditPressed] = useState(false);
  const [isPayCreditPressed, setIsPayCreditPressed] = useState(false);
  const [isMakePaymentCreditPressed, setIsMakePaymentCreditPressed] =
    useState(false);

  const [userType, setUserType] = useState("");
  const [userTypes, setUserTypes] = useState("");
  const [firstName, setFirstName] = useState("");

  // useEffect(() => {
  //   // Retrieve email and token from local storage
  //   const email = localStorage.getItem("email");
  //   const token = localStorage.getItem("token");

  //   // Call the API using the retrieved email and token
  //   axios.get(`http://localhost:8084/credit-cards`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     withCredentials: true,
  //   })
  //     .then((response) => response.data)
  //     .then((data) => {
  //       // Update the state with the API response
  //       setFirstName(data.firstname);
  //       setUserType(data.authorities[0].authority);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching API data:", error);
  //     });
  // }, []);

  const token = localStorage.getItem("token");

  const applyCreditValues = {
    creditcardname: "",
  };

  const payValues = {
    email: "",
    amount: "",
    creditcardnumber: "",
    creditcardcvv: "",
    expirydate: "",
  };

  const validationSchemaPay = Yup.object({
    cardNumber: Yup.string().required("Please enter the credit card number"),
    amount: Yup.number().required("Please enter the payment amount"),
  });

  const makePayment = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post("http://localhost:8085/customer/creditcard/make-payment", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data);
        setIsSubmitDisabled(false);
        formikMakePaymentCredit.resetForm();
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitDisabled(false);
        formikMakePaymentCredit.resetForm();
      });
  };

  const payCredit = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post("http://localhost:8084/credit-cards/pay", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsSubmitDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitDisabled(false);
      });
  };

  const formikApplyCredit = useFormik({
    initialValues: applyCreditValues,
    onSubmit: (values) => {
      console.log(values);
      setIsSubmitDisabled(true);
      axios
        .post(
          "http://localhost:8085/customer/creditcard/apply-for-credit-card",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data);
          setIsSubmitDisabled(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
          setIsSubmitDisabled(false);
        });
    },
  });

  const formikPayCredit = useFormik({
    initialValues: payValues,
    onSubmit: (values) => payCredit(values),
    validationSchema: validationSchemaPay,
  });

  const formikMakePaymentCredit = useFormik({
    initialValues: payValues,
    onSubmit: (values) => makePayment(values),
    validationSchema: validationSchemaPay,
  });

  return (
    <div className="tabless">
      <div>
        <Button
          variant={isApplyCreditPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsApplyCreditPressed(true);
            setIsMakePaymentCreditPressed(false);
          }}
          sx={{
            border: "2px solid #870040",
            marginRight: "8px",
            marginBottom: "8px",
            marginTop: "1vh",
            color: "black",
            backgroundColor:
              isApplyCreditPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
          }}
        >
          Apply for credit card
        </Button>
        <Button
          variant={isMakePaymentCreditPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsApplyCreditPressed(false);
            setIsMakePaymentCreditPressed(true);
          }}
          sx={{
            border: "2px solid #870040",
            marginTop: "1vh",
            marginRight: "8px",
            marginBottom: "8px",
            color: "black",
            backgroundColor:
            isMakePaymentCreditPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
          }}
        >
          Pay
        </Button>
      </div>
      {isApplyCreditPressed && (
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "rgba(173, 2, 83, 1)",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            component="form"
            noValidate
            className="mt-5 p-5 pt-5"
            onSubmit={formikApplyCredit.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                  }}
                >
                  <InputLabel id="creditcardname-label" sx={{ color: "black" }}>
                    Choose a credit card
                  </InputLabel>
                  <Select
                    labelId="creditcardname-label"
                    id="creditcardname"
                    name="creditcardname"
                    value={formikApplyCredit.values.creditcardname}
                    onChange={formikApplyCredit.handleChange}
                    error={
                      formikApplyCredit.touched.creditcardname &&
                      Boolean(formikApplyCredit.errors.creditcardname)
                    }
                  >
                    {Object.values(creditCards).map((creditCard) => (
                      <MenuItem key={creditCard} value={creditCard}>
                        {creditCard}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<PersonAdd />}
                >
                  {" "}
                  Apply{" "}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}

      {isMakePaymentCreditPressed && (
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "rgba(173, 2, 83, 1)",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            component="form"
            noValidate
            className="mt-5 p-5 pt-5"
            onSubmit={formikMakePaymentCredit.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="email"
                  label="Email"
                  value={formikMakePaymentCredit.values.email}
                  onChange={formikMakePaymentCredit.handleChange}
                  onBlur={formikMakePaymentCredit.handleBlur}
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
                  value={formikMakePaymentCredit.values.amount}
                  onChange={formikMakePaymentCredit.handleChange}
                  onBlur={formikMakePaymentCredit.handleBlur}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="creditcardnumber"
                  label="Card Number"
                  value={formikMakePaymentCredit.values.creditcardnumber}
                  onChange={formikMakePaymentCredit.handleChange}
                  onBlur={formikMakePaymentCredit.handleBlur}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="creditcardcvv"
                  label="CVV"
                  value={formikMakePaymentCredit.values.creditcardcvv}
                  onChange={formikMakePaymentCredit.handleChange}
                  onBlur={formikMakePaymentCredit.handleBlur}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="expirydate"
                  label="Valid thru"
                  value={formikMakePaymentCredit.values.expirydate}
                  onChange={formikMakePaymentCredit.handleChange}
                  onBlur={formikMakePaymentCredit.handleBlur}
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
                  onClick={() => formikMakePaymentCredit.resetForm()}
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
                    setIsMakePaymentCreditPressed(false);
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
      <CreditCards />
      {isApplyCreditPressed == false &&
        isMakePaymentCreditPressed == false &&
        isPayCreditPressed == false && (
          <img src={dashboardImage} alt="Dashboard image" />
        )}
    </div>
  );
};
export default CreditCard;
