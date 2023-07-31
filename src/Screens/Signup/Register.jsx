import React, { useState } from "react";
import CustomerRegister from "./CustomerRegister";
import { Button, Grid } from "@mui/material";
import register from "../../Assets/Images/login.gif";
import EmployeeRegister from "./EmployeeRegister";
// import "./Register.css"

const Register = () => {
  const [isEmployeePressed, setIsEmployeePressed] = useState(true);
  const [isCustomerPressed, setIsCustomerPressed] = useState(false);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={6}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            variant={isEmployeePressed === true ? "contained" : "outlined"}
            onClick={() => {
              setIsEmployeePressed(true);
              setIsCustomerPressed(false);
            }}
            sx={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              marginRight: "8px",
              color: "black",
              border: "2px solid #870040",
              fontSize: "1rem",
              backgroundColor:
                isEmployeePressed === true ? "antiquewhite" : "inherit",
              "&:hover": {
                border: "none",
              },
              "&:active": {
                border: "none",
              },
            }}
          >
            {" "}
            Employee register{" "}
          </Button>
          <Button
            variant={isCustomerPressed === true ? "contained" : "outlined"}
            onClick={() => {
              setIsCustomerPressed(true);
              setIsEmployeePressed(false);
            }}
            sx={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              marginRight: "8px",
              color: "black",
              border: "2px solid #870040",
              fontSize: "1rem",
              backgroundColor:
                isCustomerPressed === true ? "antiquewhite" : "inherit",
              "&:hover": {
                border: "none",
              },
              "&:active": {
                border: "none",
              },
            }}
          >
            {" "}
            Customer Register{" "}
          </Button>
        </div>
        <img
          src={register}
          alt="login"
          width="500rem"
          height="500rem"
          style={{ alignSelf: "flex-end", marginLeft: "-5rem" }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        {isEmployeePressed && <EmployeeRegister />}
        {isCustomerPressed && <CustomerRegister />}
      </Grid>
    </Grid>
  );
};

export default Register;
