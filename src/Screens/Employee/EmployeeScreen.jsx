import { Button, Paper } from "@mui/material";
import React, { useState } from "react";
import ApproveAccount from "./ApproveAccount";
import UserAccounts from "../../components/Dashboard/Employee/UserAccounts";
import PendingLoans from "../../components/Dashboard/Employee/PendingLoans";

import "./EmployeeScreen.css";
import AllTransactions from "../../components/Dashboard/Employee/AllTransactions";

const EmployeeScreen = () => {
  const [isApprorovePressed, setIsApprovedPressed] = useState(true);
  const [isAllAccountsPressed, setIsAllAccountsPressed] = useState(false);
  const [isAllTransactionPressed, setIsAllTransactionsPressed] =
    useState(false);
  const [isPendingPressed, setIsPendingPressed] = useState(false);

  return (
    <div className="transaction-image">
      <Paper>
        <Button
          variant={isApprorovePressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsApprovedPressed(true);
            setIsAllAccountsPressed(false);
            setIsPendingPressed(true);
            setIsAllTransactionsPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "1rem",
            backgroundColor:
              isApprorovePressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
            "&:active": {
              border: "none",
            },
          }}
        >
          {" "}
          Approve account{" "}
        </Button>
        <Button
          variant={isAllAccountsPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsApprovedPressed(false);
            setIsAllAccountsPressed(true);
            setIsAllTransactionsPressed(false);
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
          View all accounts{" "}
        </Button>
        <Button
          variant={isAllTransactionPressed === true ? "contained" : "link"}
          onClick={() => {
            setIsApprovedPressed(false);
            setIsAllAccountsPressed(false);
            setIsPendingPressed(false);
            setIsAllTransactionsPressed(true);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "0.65rem",
            backgroundColor:
              isAllTransactionPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
            "&:active": {
              border: "none",
            },
          }}
        >
          {" "}
          View all transactions{" "}
        </Button>
      </Paper>

      {isApprorovePressed && <ApproveAccount />}
      {isAllAccountsPressed && <UserAccounts />}
      {isAllTransactionPressed && <AllTransactions />}
    </div>
  );
};

export default EmployeeScreen;
