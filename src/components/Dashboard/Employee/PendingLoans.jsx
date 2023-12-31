import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PenfinLoans = () => {
  const [pendingLoans, setPendingLoans] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8083/employee/loan/pending-loans`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPendingLoans(res.data);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  }, []);
  return (
    <div>
      {pendingLoans ? (
        <Table
          className="mt-3"
          sx={{
            minWidth: 650,
            backgroundColor: "rgba(136, 136, 136, 0.9)",
            color: "#fff",
            borderRadius: "10px",
            maxWidth: "90vw",
            margin: "0 auto",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingLoans.map((item) => {
              return (
                <TableRow key={item.loanid}>
                  <TableCell>{item.loanid}</TableCell>
                  <TableCell>{item.loantype}</TableCell>
                  <TableCell>{item.loanamount}</TableCell>
                  <TableCell>{item.statedate}</TableCell>
                  <TableCell>{item.enddate}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};

export default PenfinLoans;
