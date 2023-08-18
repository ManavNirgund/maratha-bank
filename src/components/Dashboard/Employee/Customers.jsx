import {
  Button,
  Grid,
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

const Customers = () => {
  const token = localStorage.getItem("token");
  const [customers, setCusomers] = useState(null);
  const [isNotifyDisabled, setIsNotifyDisabled] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/employee/all-customers", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCusomers(res.data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  });

  const notify = (email) => {
    setIsNotifyDisabled(true);
    axios
      .get(`http://localhost:8080/notify/${email}`)
      .then((res) => {
        setIsNotifyDisabled(false);
        toast.success(res.data);
      })
      .catch((err) => {
        setIsNotifyDisabled(false);
        toast.error(`${err.name}: Customer may not have regitered through our Axis Rural Connect website.`);
      });
  };

  const deleteCustomer = (accNumber) => {
    if (!window.confirm("Are you sure to want to Delete this customer?")) {
      toast.success("Customer not deleted");
      return null;
    }
    axios
      .delete(`http://localhost:8081/employee/delete-customer`, {
        data: {
          accno: accNumber,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ marginBottom: "3rem" }} className="admin_image">
      {customers ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell sx={{textAlign: "center"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.accountNumber}</TableCell>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isNotifyDisabled}
                        onClick={() => {
                          notify(customer.email);
                          console.log("delete pressed");
                        }}
                      >
                        Notify
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          deleteCustomer(customer.accountNumber);
                          console.log("delete pressed");
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h1">No Customers Found!</Typography>
      )}
    </div>
  );
};

export default Customers;
