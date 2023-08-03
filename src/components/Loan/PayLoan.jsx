import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PayLoan = () => {
  const [isPayloanDisabled, setIsPayLoanDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      loantype: "",
      loanemi: "",
    },
    onSubmit: (values) => {
      setIsPayLoanDisabled(true);
      axios
        .put(`http://localhost:8083/customer/loan/loan-payment`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setIsPayLoanDisabled(false);
          console.log(res.data);
          toast.success(res.data);
          formik.resetForm();
        })
        .catch((error) => {
          setIsPayLoanDisabled(false);
          console.log(error);
          toast.error(error);
        });
    },
  });

  return (
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
              name="loanemi"
              label="EMI"
              value={formik.values.loanemi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                style: { color: "antiquewhite" },
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isPayloanDisabled}
            >
              {isPayloanDisabled ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                "Create"
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="error" type="reset">
              {" "}
              Clear{" "}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PayLoan;
