import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Container, Row, Col } from "reactstrap";
import { news, products } from "../../Assets/data/enums";
import { Link, useLocation } from "react-router-dom";

import bank from "../../Assets/Images/bank.svg";
import { Product } from "../Products/ProductsItem";
import { appName } from "../../Assets/data/enums";

import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <Container fluid className="content-container">
        <Row>
          <Col style={{ backgroundColor: "rgba(233, 236, 239, 0.5)" }}>
            <Typography variant="h3" color="black">
              Welcome to {appName.title}
            </Typography>
            <p className="lead">
              Welcome to {appName.title}, your trusted financial partner for all
              your banking needs. As one of India's leading private sector
              banks, we are committed to providing you with exceptional
              services, innovative solutions, and a seamless banking experience.
            </p>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={bank} style={{ alignSelf: "center" }} />
          <Typography variant="h4" color="black" sx={{ textAlign: "left" }}>
            Products
          </Typography>
          <div className="product-container-wrapper">
            <div className="product-container">
              {products.map((item) => {
                return (
                  <Product
                    key={item.id}
                    component={Link}
                    to={item.to}
                    className="card"
                  >
                    <CardMedia>{item.icon}</CardMedia>
                    <CardContent>
                      <Typography variant="h5" color="black">
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Product>
                );
              })}
            </div>
            <Typography variant="h4" color="black" sx={{ textAlign: "left" }}>
            News
          </Typography>
            <div className="product-container">
              {news.map((item) => {
                return (
                  <Product
                    key={item.id}
                    component={Link}
                    to={item.to}
                    className="card"
                  >
                    <CardMedia>{item.icon}</CardMedia>
                    <CardContent>
                      <Typography variant="h5" color="black">
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Product>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
