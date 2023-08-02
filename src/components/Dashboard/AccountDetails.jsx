import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const AccountDetails = ({ account }) => {
  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: "auto",
        backgroundColor: "rgba(173, 2, 80, 0.85)",
      }}
    >
      <CardContent>
        <Typography color="white" fontWeight="bold">{`${account}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
