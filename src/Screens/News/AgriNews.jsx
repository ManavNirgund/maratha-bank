import React, { useEffect, useState } from "react";
import axios from "axios";

import "./AgriNews.css";
import { Card, Grid, Typography } from "@mui/material";

const AgriNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const API_KEY = "acbd789b603b4c30b65b99e4114f0da0";
    const API_URL = `https://newsapi.org/v2/everything`;

    axios
      .get(API_URL, {
        params: {
          q: "agriculture",
          apiKey: API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <div>
      <div className="content">
        {/* Jumbotron */}
        <div className="jumbotron">
          <img
            src={
              "https://www.aeologic.com/blog/wp-content/uploads/2022/11/Importance-of-Modern-Technology-In-Agriculture-Industry-1180x664.png"
            }
            alt="Jumbotron"
          />
          <div className="overlay"></div>
          <h2>Latest News</h2>
        </div>

        <Grid container spacing={5} marginTop="1rem">
          {news.map((article, index) => {
            const dateObj = new Date(article.publishedAt);
            const localTime = dateObj.toLocaleString();
            // const year = dateObj.getFullYear();
            // const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            // const day = String(dateObj.getDate()).padStart(2, "0");

            return (
              <Grid item key={index} xs={12} sm={4}>
                <Card sx={{ height: "100%", backgroundColor: "#ececec" }}>
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}

                  <Typography variant="h4">{article.title}</Typography>
                  <Typography>{`Source: ${article.source.name}`}</Typography>
                  <Typography>{`Published at: ${localTime}`}</Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default AgriNews;
