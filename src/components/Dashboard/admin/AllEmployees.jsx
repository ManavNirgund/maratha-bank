import React, { useEffect, useState } from "react";
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
import { Tab } from "react-bootstrap";
import { toast } from "react-toastify";

const AllEmployees = () => {
  const token = localStorage.getItem("token");
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/all-employees", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  });

  const deleteEmployee = (id) => {
    // TODO implement deletion of employee here
    axios
      .delete(`http://localhost:8081/admin/delete-employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data);
      });
  };

  return (
    <div style={{ marginBottom: "3rem" }} className="admin_image">
      {employees ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Enabled?</TableCell>
              <TableCell>Login Attempts</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.username}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.enabled ? "Yes" : "No"}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {employee.loginAttempts}
                </TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          deleteEmployee(employee.id);
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
        <Typography variant="h1">No Employees Found!</Typography>
      )}
    </div>
  );
};

export default AllEmployees;
