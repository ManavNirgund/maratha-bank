import { ErrorTwoTone, PersonAdd } from "@mui/icons-material";
import { DeleteIcon } from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ApproveAccount = () => {
  const [isApproveDisabled, setIsApproveDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      accid: "",
    },
    onSubmit: (values) => {
      setIsApproveDisabled(true);
      console.log(values);
      axios
        .put(`http://localhost:8081/employee/activate-account`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setIsApproveDisabled(false);
          alert(`${res.data}`);
          console.log(res);
          formik.resetForm();
        })
        .catch((error) => {
          setIsApproveDisabled(false);
          alert("Account", error);
          console.log(error);
          formik.resetForm();
        });
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "3rem",
        marginBottom: "3rem",
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
        <Typography
          variant="h5"
          sx={{
            color: "antiquewhite",
          }}
        >
          Approve Account
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                required
                label="Account ID"
                id="accid"
                type="text"
                name="accid"
                value={formik.values.accid}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                startIcon={<PersonAdd />}
                disabled={isApproveDisabled}
              >
                {isApproveDisabled ? (
                  <CircularProgress size={24} color="primary" />
                ) : (
                  "Approve"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ApproveAccount;
