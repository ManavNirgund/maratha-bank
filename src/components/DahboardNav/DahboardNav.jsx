import React, { useEffect, useState } from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Typography,
} from "@mui/material";

import "./DashboardNav.css";
import axios from "axios";
import { Card } from "react-bootstrap";

const tableStyle = {
  minWidth: "650px",
  borderCollapse: "collapse",
};

const cellStyle = {
  border: "1px solid black",
  padding: "8px",
};

const headerCellStyle = {
  ...cellStyle,
  backgroundColor: "lightgray",
};

const DashboardNav = () => {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    // Call the API using the retrieved email and token
    axios
      .get(
        `http://localhost:8082/customer/transaction/show-all-my-transactions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setTransaction(res.data);
        console.log(res.data);
      })

      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  return (
    <div>
      {transaction ? (
        <TableContainer component={Paper}>
          <Table
            className="mb-3"
            sx={{
              minWidth: 650,
              backgroundColor: "#888",
              color: "#fff",
              borderRadius: "10px",
              maxWidth: "90vw",
              margin: "0 auto",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={headerCellStyle}>ID</TableCell>
                <TableCell sx={headerCellStyle}>Date</TableCell>
                <TableCell sx={headerCellStyle}>Time</TableCell>
                <TableCell sx={headerCellStyle}>Amount</TableCell>
                <TableCell sx={headerCellStyle}>Description</TableCell>
                <TableCell sx={headerCellStyle}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction.map((item) => {
                let [date, time] = new Date(item.datetime)
                  .toLocaleString()
                  .split(", ");
                return (
                  <TableRow key={item.id}>
                    {console.log(item.id)}
                    <TableCell sx={cellStyle}>{item.transactionid}</TableCell>
                    <TableCell sx={cellStyle}>{date}</TableCell>
                    <TableCell sx={cellStyle}>{time}</TableCell>
                    <TableCell sx={cellStyle}>{item.amount}</TableCell>
                    <TableCell sx={cellStyle}>{item.description}</TableCell>
                    <TableCell sx={cellStyle}>{item.transactiontype}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Card className="mb-3">
          <Typography variant="h4" color="black" fontWeight="bold">
            No transaction found! You can add new transactions buy depositing
            money from "Add Balance" button!
          </Typography>
        </Card>
      )}
    </div>
  );
};

export default DashboardNav;
