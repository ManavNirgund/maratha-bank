import { Button } from "@mui/material";
import React, { useState } from "react";
import AllEmployees from "./AllEmployees";
import Customers from "../Employee/Customers";
import UserAccounts from "../Employee/UserAccounts";

const AdminDashboard = () => {
  const [isEmployeePressed, setIsEmployeePressed] = useState(true);
  const [isCustomerPressed, setIsCustomerPressed] = useState(false);
  const [isAllAccountsPressed, setIsAllAccountsPressed] = useState(false);

  return (
    <div>
      <div>
        <Button
          variant={isEmployeePressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsEmployeePressed(true);
            setIsCustomerPressed(false);
            setIsAllAccountsPressed(false);
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
          Employees{" "}
        </Button>
        <Button
          variant={isCustomerPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsCustomerPressed(true);
            setIsEmployeePressed(false);
            setIsAllAccountsPressed(false);
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
          Customers{" "}
        </Button>
        <Button
          variant={isAllAccountsPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsCustomerPressed(false);
            setIsEmployeePressed(false);
            setIsAllAccountsPressed(true);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "1rem",
            backgroundColor:
              isAllAccountsPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
            "&:active": {
              border: "none",
            },
          }}
        >
          {" "}
          View All Accounts{" "}
        </Button>
      </div>

      {isEmployeePressed && <AllEmployees />}
      {isCustomerPressed && <Customers />}
      {isAllAccountsPressed && <UserAccounts />}
    </div>
  );
};

export default AdminDashboard;
