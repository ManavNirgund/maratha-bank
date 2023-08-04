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

const AllCreditCards = () => {
  const [cards, setCards] = useState(null);

  const [isActivateDisabled, setISActivateDisabled] = useState(false);
  const [isCloseDisabled, setIsCloseDisabled] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8085/employee/creditcard/all-credit-cards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCards(res.data);
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
        `http://localhost:8085/employee/creditcard/activate-credit-card`,
        {
            creditcardid: id,
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

  const closeCard = (id) => {
    axios
      .put(
        `http://localhost:8085/employee/creditcard/foreclose-credit-card`,
        {
            creditcardid: id,
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
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      {cards ? (
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
              <TableCell>Card</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Valid thru</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((item) => {
              return (
                <TableRow key={item.creditcardid}>
                  <TableCell>{item.creditcardid}</TableCell>
                  <TableCell>{item.creditcardname}</TableCell>
                  <TableCell>{item.creditcardnumber}</TableCell>
                  <TableCell>{item.creditcardlimit}</TableCell>
                  <TableCell>{item.balance}</TableCell>
                  <TableCell>{item.expirydate}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    {item.status === "PENDING" ? (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        disabled={isActivateDisabled}
                        onClick={() => activate(item.creditcardid)}
                      >
                        {isActivateDisabled ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Activate"
                        )}
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        disabled={isCloseDisabled}
                        onClick={() => closeCard(item.creditcardid)}
                      >
                        {isCloseDisabled ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Close"
                        )}
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

export default AllCreditCards;
