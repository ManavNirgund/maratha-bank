import { Token } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CreditCards = () => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8085/customer/creditcard/my-credit-cards", {
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
      });
  }, []);

  return (
    <div>
      {cards && (
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Card</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Valid thru</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
                <TableRow>
                    <TableCell>{card.creditcardid}</TableCell>
                    <TableCell>{card.creditcardname}</TableCell>
                    <TableCell>{card.creditcardnumber}</TableCell>
                    <TableCell>{card.creditcardlimit}</TableCell>
                    <TableCell>{card.balance}</TableCell>
                    <TableCell>{card.expirydate}</TableCell>
                    <TableCell>{card.status}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CreditCards;
