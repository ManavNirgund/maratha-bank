import { Button, Paper } from "@mui/material";
import React, { useState } from "react";
import ApproveAccount from "./ApproveAccount";
import UserAccounts from "../../components/Dashboard/Employee/UserAccounts";
import PendingLoans from "../../components/Dashboard/Employee/PendingLoans";

import "./EmployeeScreen.css";
import AllTransactions from "../../components/Dashboard/Employee/AllTransactions";
import AllLoans from "../../components/Dashboard/Employee/AllLoans";
import AllCreditCards from "../../components/Dashboard/Employee/AllCreditCards";
import AllLocker from "../../components/Dashboard/Employee/AllLockers";

const EmployeeScreen = () => {
  const [isApprorovePressed, setIsApprovedPressed] = useState(true);
  const [isAllAccountsPressed, setIsAllAccountsPressed] = useState(false);
  const [isAllTransactionPressed, setIsAllTransactionsPressed] =
    useState(false);
  const [isAllLoansPressed, setIsAllLoansPressed] = useState(false);
  const [isAllCreditsPressed, setIsAllCreditsPressed] = useState(false);
  const [isAllLockersPressed, setIsAllLockersPressed] = useState(false);

  return (
    <div className="transaction-image">
      <Paper>
        <Button
          variant={isApprorovePressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsApprovedPressed(true);
            setIsAllAccountsPressed(false);
            setIsAllTransactionsPressed(false);
            setIsAllCreditsPressed(false);
            setIsAllLockersPressed(false);
            setIsAllLoansPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "0.65rem",
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
            setIsAllCreditsPressed(false);
            setIsAllLockersPressed(false);
            setIsAllLoansPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "0.65rem",
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
            setIsAllTransactionsPressed(true);
            setIsAllCreditsPressed(false);
            setIsAllLockersPressed(false);
            setIsAllLoansPressed(false);
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
        <Button
          variant={isAllLoansPressed === true ? "contained" : "link"}
          onClick={() => {
            setIsAllLoansPressed(true);
            setIsApprovedPressed(false);
            setIsAllAccountsPressed(false);
            setIsAllTransactionsPressed(false);
            setIsAllCreditsPressed(false);
            setIsAllLockersPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "0.65rem",
            backgroundColor:
              isAllLoansPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
            "&:active": {
              border: "none",
            },
          }}
        >
          {" "}
          View all loans{" "}
        </Button>
        <Button
          variant={isAllCreditsPressed === true ? "contained" : "link"}
          onClick={() => {
            setIsAllLoansPressed(false);
            setIsApprovedPressed(false);
            setIsAllAccountsPressed(false);
            setIsAllTransactionsPressed(false);
            setIsAllCreditsPressed(true);
            setIsAllLockersPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "0.65rem",
            backgroundColor:
              isAllCreditsPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
            "&:active": {
              border: "none",
            },
          }}
        >
          View all credit cards
        </Button>
        <Button
          variant={isAllLockersPressed === true ? "contained" : "link"}
          onClick={() => {
            setIsAllLoansPressed(false);
            setIsApprovedPressed(false);
            setIsAllAccountsPressed(false);
            setIsAllTransactionsPressed(false);
            setIsAllCreditsPressed(false);
            setIsAllLockersPressed(true);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "0.65rem",
            backgroundColor:
              isAllLockersPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
            "&:active": {
              border: "none",
            },
          }}
        >
          View all lockers
        </Button>
      </Paper>

      {isApprorovePressed && <ApproveAccount />}
      {isAllAccountsPressed && <UserAccounts />}
      {isAllTransactionPressed && <AllTransactions />}
      {isAllLoansPressed && <AllLoans />}
      {isAllCreditsPressed && <AllCreditCards />}
      {isAllLockersPressed && <AllLocker />}
    </div>
  );
};

export default EmployeeScreen;
