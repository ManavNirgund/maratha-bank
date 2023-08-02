import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { creditCards } from "../../Assets/data/enums";
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

const CLoseCredit = () => {
  const payCredit = {
    username: "",
    creditcardname: "",
  };

  const formik = useFormik({
    initialValues: payCredit,
    onSubmit: (values) => {
      console.log(values)
      axios.put(`http://localhost:8085/customer/creditcard/close-credit-card-request`, values, {
        headers: {
          "Content-Type": "application/json",   
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    }
  });

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
        className="mt-5 p-5 pt-5"
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              required
              label="Username"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={
                formik.touched.username && formik.errors.username ? true : false
              }
              helperText={formik.touched.username && formik.errors.username}
              InputProps={{
                style: { color: "antiquewhite" },
              }}
              InputLabelProps={{
                style: { color: "antiquewhite" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "antiquewhite",
                  },
                },
              }}
            />
          </Grid>
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
                value={formik.values.creditcardname}
                onChange={formik.handleChange}
                error={
                  formik.touched.creditcardname &&
                  Boolean(formik.errors.creditcardname)
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
  );
};

export default CLoseCredit;
