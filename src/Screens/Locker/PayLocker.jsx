import { Payment } from "@mui/icons-material";
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
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";

const PayLocker = () => {
  const [isPayDisabled, setIsPayDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      lockerid: "",
      lockertype: "",
      lockeramount: "",
    },
    onSubmit: (values) => {
      setIsPayDisabled(true);
      console.log(values);
      axios
        .put(`http://localhost:8084/customer/locker/locker-payment`, values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setIsPayDisabled(false);
          console.log(res.data);
          toast.success(res.data);
        })
        .catch((error) => {
          setIsPayDisabled(false);
          console.log(error);
          toast.error(JSON.stringify(error));
        });
    },
  });

  return (
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
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                style: { color: "antiquewhite" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              variant="filled"
              name="lockerid"
              label="Locker id"
              value={formik.values.lockerid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                style: { color: "antiquewhite" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              variant="filled"
              name="lockertype"
              label="Type"
              value={formik.values.lockertype}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                style: { color: "antiquewhite" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              variant="filled"
              name="lockeramount"
              label="Amount"
              value={formik.values.lockeramount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                style: { color: "antiquewhite" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isPayDisabled}
              startIcon={<Payment />}
            >
              {isPayDisabled ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                "Pay"
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              type="reset"
              startIcon={<ClearIcon />}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PayLocker;
