import {
  Button,
  CircularProgress,
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
import { cellStyle, headerCellStyle, tableStyle } from "../../../Assets/data/styles";

const AllLoans = () => {
  const [loans, setLoans] = useState(null);

  const [isActivateDisabled, setISActivateDisabled] = useState(false);
  const [isCloseDisabled, setIsCloseDisabled] = useState(false);

  const cellStyle = {
    color: "white"
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8083/employee/loan/all-loans`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoans(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  }, []);

  const activate = (id) => {
    setISActivateDisabled(true);
    axios
      .put(
        `http://localhost:8083/employee/loan/activate-loan`,
        {
          loanid: id,
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
        toast.error(error);
      });
  };

  const closeLoan = (id) => {
    setIsCloseDisabled(true);
    axios
      .put(
        `http://localhost:8083/employee/loan/close-loan`,
        {
          loanid: id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setIsCloseDisabled(false);
        console.log(res.data);
        toast.success(res.data);
      })
      .catch((error) => {
        setIsCloseDisabled(false);
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <div>
      {loans ? (
        <Table
          className="mt-3"
          // sx={{
          //   minWidth: 650,
          //   backgroundColor: "rgba(136, 136, 136, 0.9)",
          //   color: "#fff",
          //   borderRadius: "10px",
          //   maxWidth: "90vw",
          //   margin: "0 auto",
          // }}
          style={tableStyle}
        >
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>ID</TableCell>
              <TableCell style={headerCellStyle}>Type</TableCell>
              <TableCell style={headerCellStyle}>Amount</TableCell>
              <TableCell style={headerCellStyle}>EMI</TableCell>
              <TableCell style={headerCellStyle}>Start Date</TableCell>
              <TableCell style={headerCellStyle}>End Date</TableCell>
              <TableCell style={headerCellStyle}>Tenure</TableCell>
              <TableCell style={headerCellStyle}>Status</TableCell>
              <TableCell style={headerCellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((item) => {
              return (
                <TableRow key={item.loanid} style={cellStyle}>
                  <TableCell style={cellStyle}>{item.loanid}</TableCell>
                  <TableCell style={cellStyle}>{item.loantype}</TableCell>
                  <TableCell style={cellStyle}>{item.loanamount}</TableCell>
                  <TableCell style={cellStyle}>{item.monthlyemi}</TableCell>
                  <TableCell style={cellStyle}>{item.statedate}</TableCell>
                  <TableCell style={cellStyle}>{item.enddate}</TableCell>
                  <TableCell style={cellStyle}>{item.duration}</TableCell>
                  <TableCell style={cellStyle}>{item.status}</TableCell>
                  <TableCell>
                    {item.status == "PENDING" ? (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        disabled={isActivateDisabled}
                        onClick={() => activate(item.loanid)}
                      >
                        {isActivateDisabled ? <CircularProgress /> : "Activate"}
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        disabled={isCloseDisabled}
                        onClick={() => closeLoan(item.loanid)}
                      >
                        {isCloseDisabled ? <CircularProgress /> : "Close"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h6">No loan found!</Typography>
      )}
    </div>
  );
};

export default AllLoans;
