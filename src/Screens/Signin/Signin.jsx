import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import CustomerLogin from "./CustomerLogin";
import flatGif from "../../Assets/Images/flat-gif.gif";
import AdminLogin from "./AdminLogin";
import EmployeeLogin from "./EmployeeLogin";

const Signin = () => {
  const [isAdminLoginPressed, setIsAdminLoginPressed] = useState(true);
  const [isEmployeeLoginPressed, setIsEmployeeLoginPressed] = useState(false);
  const [isCustomerLoginPressed, setIsisCustomerLoginPressed] = useState(false);

  return (
    <Grid container spacing={0}>
      {/* On small screens, the order remains unchanged */}
      <Grid item xs={12} md={6}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            variant={isAdminLoginPressed === true ? "contained" : "outlined"}
            onClick={() => {
              setIsAdminLoginPressed(true);
              setIsEmployeeLoginPressed(false);
              setIsisCustomerLoginPressed(false);
            }}
            sx={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              marginRight: "8px",
              color: "black",
              border: "2px solid #870040",
              fontSize: "1rem",
              backgroundColor:
                isAdminLoginPressed === true ? "antiquewhite" : "inherit",
              "&:hover": {
                border: "none",
              },
              "&:active": {
                border: "none",
              },
            }}
          >
            {" "}
            Admin login{" "}
          </Button>
          <Button
            variant={isEmployeeLoginPressed === true ? "contained" : "outlined"}
            onClick={() => {
              setIsAdminLoginPressed(false);
              setIsEmployeeLoginPressed(true);
              setIsisCustomerLoginPressed(false);
            }}
            sx={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              marginRight: "8px",
              color: "black",
              border: "2px solid #870040",
              fontSize: "1rem",
              backgroundColor:
                isEmployeeLoginPressed === true ? "antiquewhite" : "inherit",
              "&:hover": {
                border: "none",
              },
              "&:active": {
                border: "none",
              },
            }}
          >
            {" "}
            Employee login{" "}
          </Button>
          <Button
            variant={isCustomerLoginPressed === true ? "contained" : "outlined"}
            onClick={() => {
              setIsAdminLoginPressed(false);
              setIsEmployeeLoginPressed(false);
              setIsisCustomerLoginPressed(true);
            }}
            sx={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              marginRight: "8px",
              color: "black",
              border: "2px solid #870040",
              fontSize: "1rem",
              backgroundColor:
                isCustomerLoginPressed === true ? "antiquewhite" : "inherit",
              "&:hover": {
                border: "none",
              },
              "&:active": {
                border: "none",
              },
            }}
          >
            {" "}
            Customer login{" "}
          </Button>
        </div>
        {isAdminLoginPressed && <AdminLogin />}
        {isEmployeeLoginPressed && <EmployeeLogin />}
        {isCustomerLoginPressed && <CustomerLogin />}
      </Grid>

      {/* On large screens, place the flat gif on the right */}
      <Grid item xs={12} md={6}>
        <img
          src={flatGif}
          alt="login"
          width="500rem"
          height="500rem"
          style={{ alignSelf: "flex-end" }}
        />
      </Grid>
    </Grid>
  );
};

export default Signin;