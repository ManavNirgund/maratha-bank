import { Token } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GiftCards = () => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8086/customer/giftcard/my-giftcards-purchased", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCards(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  });

  return (
    <div>
      {cards && (
        <Table
          className="mt-3"
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
              <TableCell>Card</TableCell>
              <TableCell>Reciever</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow>
                <TableCell>{card.giftcardname}</TableCell>
                <TableCell>{card.recipientname}</TableCell>
                <TableCell>{card.recipientemail}</TableCell>
                <TableCell>{card.giftcardamount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default GiftCards;
