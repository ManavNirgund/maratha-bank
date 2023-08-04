import {
  Button,
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

const AllLocker = () => {
  const [lockers, setLockers] = useState(null);

  const [isActivateDisabled, setISActivateDisabled] = useState(false);
  const [isCloseDisabled, setIsCloseDisabled] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8084/employee/locker/all-lockers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLockers(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  });

  const activate = (id) => {
    setISActivateDisabled(true);
    axios
      .put(
        `http://localhost:8084/employee/locker/activate-locker`,
        {
          lockerid: id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setISActivateDisabled(false);
        console.log(res.data);
        toast.success(res.data);
      })
      .catch((error) => {
        setISActivateDisabled(false);
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const closeLocker = (id) => {
    setIsCloseDisabled(true);
    axios
      .put(
        `http://localhost:8084/customer/locker/close-locker-request`,
        {
          loanid: id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setIsCloseDisabled(false);
        toast.success(res.data);
      })
      .catch((error) => {
        setIsCloseDisabled(false);
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      {lockers ? (
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
              <TableCell>Location</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Paid?</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lockers.map((item) => {
              return (
                <TableRow key={item.lockerid}>
                  <TableCell>#{item.lockerid}</TableCell>
                  <TableCell>{item.lockertype}</TableCell>
                  <TableCell>{item.lockerlocation}</TableCell>
                  <TableCell>{item.lockersize}</TableCell>
                  <TableCell>{item.amountPaid ? "Yes" : "No"}</TableCell>
                  <TableCell>{item.lockerstatus}</TableCell>
                  <TableCell>
                    {item.lockerstatus == "PENDING" ? (
                      <Button
                        variant="contained"
                        color="success"
                        disabled={isActivateDisabled}
                        onClick={() => {
                          activate(item.lockerid);
                        }}
                      >
                        Activate
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        disabled={isCloseDisabled}
                        onClick={() => {
                          closeLocker(item.lockerid);
                        }}
                      >
                        Close
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};

export default AllLocker;
