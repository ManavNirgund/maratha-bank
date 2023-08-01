import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const AccountDetails = ({ account }) => {
  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: "auto",
        backgroundColor: "rgba(255, 3, 122, 0.8)",
      }}
    >
      <CardContent>
        <Typography>{`${account}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
