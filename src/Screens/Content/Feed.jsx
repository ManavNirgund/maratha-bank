import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Feed = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users`)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        toast.error(`${err.name}: ${err.message}`);
      });
  }, []);

  return (
    <div>
      <h1>Your Feed</h1>
      {/* Conditional rendering to show articles or a message */}
      {userData.length > 0 ? (
        <Grid container spacing={4}>
          {userData.map((user) => {
            return (
              <React.Fragment key={user.userid}>
                {user.articles.length > 0 &&
                  user.articles.map((article) => {
                    const dateObj = new Date(article.publishedDate);

                    const options = {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    };
                    const longDate = dateObj.toLocaleDateString(
                      undefined,
                      options
                    );

                    console.log(longDate);

                    return (
                      <Grid item key={article.id} xs={12} sm={6}>
                        <Card
                          variant="outlined"
                          sx={{
                            backgroundColor: "#ececec",
                            p: 2,
                            height: "100%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            marginBottom="0.5rem"
                          >
                            {article.title}
                          </Typography>
                          <Typography
                            variant="body"
                            textAlign="left"
                            marginBottom="0.5rem"
                          >
                            {article.content}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            textAlign="left"
                            fontWeight="bold"
                            marginBottom="0.5rem"
                          >
                            {user.uname}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            textAlign="left"
                            fontWeight="bold"
                            marginBottom="0.5rem"
                          >
                            {longDate}
                          </Typography>
                        </Card>
                      </Grid>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography variant="h5">No users to display.</Typography>
        </Grid>
      )}
    </div>
  );
};

export default Feed;
