import { PersonAdd } from "@mui/icons-material";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PayCredit = () => {
  const [cardInfo, setCardInfo] = useState([]);
  const [cardExpiry, setCardExpiry] = useState(null);

  const payValues = {
    email: "",
    emiAmount: "",
    creditcardnumber: "",
    creditcardcvv: "",
    expirydate: "",
  };

  const formikPayCredit = useFormik({
    initialValues: payValues,
    onSubmit: (values) => {
      console.log("submit", values);
      axios
        .post("http://localhost:8085/customer/creditcard/pay-emi", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          toast.success(res.data)
          formikPayCredit.resetForm();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error)
        });
    },
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8085/customer/creditcard/my-credit-cards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCardInfo(res.data);
        console.log(res.data);
      });
    console.log(cardExpiry);
  }, []);

  return (
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
        className="p-5 pt-5"
        onSubmit={formikPayCredit.handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              name="email"
              label="Email"
              value={formikPayCredit.values.email}
              onChange={formikPayCredit.handleChange}
              onBlur={formikPayCredit.handleBlur}
              InputProps={{
                style: { color: "antiquewhite" },
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              name="emiAmount"
              label="Amount"
              value={formikPayCredit.values.emiAmount}
              onChange={formikPayCredit.handleChange}
              onBlur={formikPayCredit.handleBlur}
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
              value={formikPayCredit.values.creditcardnumber}
              onChange={formikPayCredit.handleChange}
              onBlur={formikPayCredit.handleBlur}
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
              value={formikPayCredit.values.creditcardcvv}
              onChange={formikPayCredit.handleChange}
              onBlur={formikPayCredit.handleBlur}
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
              value={formikPayCredit.values.expirydate}
              onChange={formikPayCredit.handleChange}
              onBlur={formikPayCredit.handleBlur}
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
              onClick={() => formikPayCredit.resetForm()}
            >
              {" "}
              Clear{" "}
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="error"
              //   startIcon={<DeleteIcon />}
            >
              {" "}
              Cancel{" "}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PayCredit;
