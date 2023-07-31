import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const AccountDetails = ({ account }) => {
  return (
    <Card sx={{ maxWidth: 400, margin: "auto" }}>
      <CardContent>
        <Typography>{account}</Typography>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
