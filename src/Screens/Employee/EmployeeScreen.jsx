import { Button } from "@mui/material";
import React, { useState } from "react";
import ApproveAccount from "./ApproveAccount";
import UserAccounts from "../../components/Dashboard/UserAccounts";

const EmployeeScreen = () => {
  const [isApprorovePressed, setIsApprovedPressed] = useState(true);

  return (
    <div>
      <div>
        <Button
          variant={isApprorovePressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsApprovedPressed(true);
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
      </div>

      {isApprorovePressed && <ApproveAccount />}
      <UserAccounts />
    </div>
  );
};

export default EmployeeScreen;
