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

const Lockers = () => {
  const [lockers, setLockers] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8084/customer/locker/my-lockers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLockers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {lockers ? (
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
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Paid?</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lockers.map((locker) => (
              <TableRow>
                <TableCell>#{locker.lockerid}</TableCell>
                <TableCell>{locker.lockertype}</TableCell>
                <TableCell>{locker.lockerlocation}</TableCell>
                <TableCell>{locker.lockersize}</TableCell>
                <TableCell>{locker.amountPaid ? "Yes" : "No"}</TableCell>
                <TableCell>{locker.lockerstatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h1">No lockers found!</Typography>
      )}
    </div>
  );
};

export default Lockers;
