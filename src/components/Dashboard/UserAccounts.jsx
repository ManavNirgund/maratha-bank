import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const UserAccounts = () => {
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8081/employee/all-accounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((error) => {
        console.log("Error fetching accounts", error);
      });
  }, []);

  return (
    <div>
      {accounts ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Account Type</TableCell>
              <TableCell>IFSC Code</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((item) => (
              <TableRow key={item.accid}>
                <TableCell>{item.accid}</TableCell>
                <TableCell>{item.userid}</TableCell>
                <TableCell>{item.accno}</TableCell>
                <TableCell>{item.acctype}</TableCell>
                <TableCell>{item.ifsccode}</TableCell>
                <TableCell>{item.balance}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>
            No Accounts Found! Please add an account to your profile first by registering
        </Typography>
      )}
    </div>
  );
};

export default UserAccounts;
