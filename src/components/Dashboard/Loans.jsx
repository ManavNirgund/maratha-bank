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

const Loans = () => {
  const [loans, setLoans] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8083/customer/loan/my-loans`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoans(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {loans ? (
        <Table
          className="mb-3"
          sx={{
            minWidth: 650,
            backgroundColor: "#888",
            color: "#fff",
            borderRadius: "10px",
            maxWidth: "90vw", // Set an appropriate maxWidth value
            margin: "0 auto", // Center the table horizontally
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount requested</TableCell>
              <TableCell>EMI</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Tenure</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow>
                <TableCell>#{loan.loanid}</TableCell>
                <TableCell>{loan.loantype}</TableCell>
                <TableCell>{loan.loanamount}</TableCell>
                <TableCell>{loan.monthlyemi}</TableCell>
                <TableCell>{loan.statedate}</TableCell>
                <TableCell>{loan.enddate}</TableCell>
                <TableCell>{loan.duration}</TableCell>
                <TableCell>{loan.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h1">No loans found!</Typography>
      )}
    </div>
  );
};

export default Loans;
