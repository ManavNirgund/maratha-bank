import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import dashboardImage from "../../Assets/Images/dashboard.svg";

import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { giftCards } from "../../Assets/data/enums";
import { toast } from "react-toastify";
import GiftCards from "../../components/Dashboard/GiftCard";
import "./GiftCard.css"

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

const GiftCard = () => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isApplyGiftPressed, setIsApplyGiftPressed] = useState(true);

  const token = localStorage.getItem("token");

  const giftValues = {
    giftcardname: giftCards.AMAZON,
    recipientname: "",
    recipientemail: "",
    giftcardamount: "",
  };

  const validationSchemaGift = Yup.object({
    cutsomer: Yup.string()
      .required("Please enter an email address")
      .email("Wring email formats"),
    giftCardType: Yup.string().required("Please choose a Gift Card"),
    amount: Yup.number().required("Please enter the payment amount"),
    accountId: Yup.string().required("Please enter an account ID"),
  });

  const formikApplyGift = useFormik({
    initialValues: giftValues,
    onSubmit: (values) => {
      setIsSubmitDisabled(true);
      console.log(values);
      axios
        .post("http://localhost:8086/customer/giftcard/buy-giftcard", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success(res.data);
          setIsSubmitDisabled(false);
          formikApplyGift.resetForm();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
          setIsSubmitDisabled(false);
        });
    },
  });

  return (
    <div className={isApplyGiftPressed && "giftimage"}>
      <div>
        <Button
          variant={isApplyGiftPressed === 1 ? "contained" : "outlined"}
          onClick={() => setIsApplyGiftPressed(true)}
          sx={{
            border: "2px solid #870040",
            marginTop: "1vh",
            marginRight: "8px",
            marginBottom: "8px",
            color: "black",
            backgroundColor:
              isApplyGiftPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
          }}
        >
          Get a Gift Card
        </Button>
      </div>
      {isApplyGiftPressed && (
        <Container
          maxWidth="sm"
          className="mb-5"
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
            onSubmit={formikApplyGift.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="giftCard-label" sx={{ color: "white" }}>
                    Gift Card
                  </InputLabel>
                  <Select
                    labelId="account"
                    id="giftcardname"
                    name="giftcardname"
                    value={formikApplyGift.values.giftcardname}
                    onChange={formikApplyGift.handleChange}
                    inputProps={{
                      style: { color: "white" },
                    }}
                  >
                    {Object.values(giftCards).map((item) => (
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
                  variant="filled"
                  name="recipientname"
                  label="Recepient Name"
                  value={formikApplyGift.values.recipientname}
                  onChange={formikApplyGift.handleChange}
                  onBlur={formikApplyGift.handleBlur}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  name="recipientemail"
                  label="recipientemail"
                  value={formikApplyGift.values.recipientemail}
                  onChange={formikApplyGift.handleChange}
                  onBlur={formikApplyGift.handleBlur}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="giftcardamount"
                  label="Amount"
                  value={formikApplyGift.values.giftcardamount}
                  onChange={formikApplyGift.handleChange}
                  onBlur={formikApplyGift.handleBlur}
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
                  disabled={isSubmitDisabled}
                  startIcon={<PersonAdd />}
                >
                  {" "}
                  Apply{" "}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => formikApplyGift.resetForm()}
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
                    setIsApplyGiftPressed(false);
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

      <GiftCards />

      {isApplyGiftPressed == false && (
        <img src={dashboardImage} alt="Dashboard image" />
      )}
    </div>
  );
};
export default GiftCard;
