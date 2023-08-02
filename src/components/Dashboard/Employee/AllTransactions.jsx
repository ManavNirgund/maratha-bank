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

const AllTransactions = () => {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8082/employee/transaction/show-all-transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  }, []);
  return (
    <div>
      {transactions ? (
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
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((item) => {
                const [date, time] = new Date(item.datetime).toLocaleString().split(", ")
              return (
                <TableRow key={item.transactionid}>
                  <TableCell>{item.transactionid}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{time}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.transactiontype}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};

export default AllTransactions;
