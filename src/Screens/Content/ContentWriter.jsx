import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/logo/png/logo-no-background.png";
import { toast } from "react-toastify";

const ContentWriter = () => {
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [isPublishDisabled, setIsPublishDisabled] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/customer/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        let userInfo = res.data;
        const emailPattern = /Email\s+-\s+([^\n]+)/;
        const matches = userInfo.match(emailPattern);

        if (matches && matches[1]) {
          let emailAddress = matches[1];
          setEmail(emailAddress)
          console.log("Email Address:", emailAddress);
        } else {
          console.log("Email address not found.");
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${email}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err.name, err.message));
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: (values) => {

      const postData = {
        title: values.title,
        content: values.content,
        author: userData,
        publishedDate: "2023-07-25T12:34:56",
      };
      setIsPublishDisabled(true);
      axios
        .post(`http://localhost:8080/create-article/${email}`, postData)
        .then((res) => {
          console.log(postData);
          toast.success("Article pblished!");
          setIsPublishDisabled(false);
          formik.resetForm();
        })
        .catch((error) => {
          alert(`${error.name}: ${error.message}`);
        });
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginBottom: "3rem",
        marginTop: "3rem",
        height: "70%",
        maxWidth: "30%",
        minWidth: "35vw",
        backgroundColor: "#ececec",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.75)",
      }}
    >
      <Box
        component="form"
        noValidate
        className="mt-3 p-5 pt-5"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ececec",
        }}
      >
        <img
          src={logo}
          style={{
            marginTop: "2rem",
            maxWidth: "60vh",
          }}
        />

        <Typography
          variant="h4"
          marginTop="3rem"
          sx={{ color: "GrayText" }}
          align="center"
        >
          Post content
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              type="text"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="content"
              name="content"
              label="Content"
              type="text"
              variant="outlined"
              multiline
              rows={10}
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              color="primary"
              disabled={isPublishDisabled}
              sx={{
                display: "flex",
                marginBottom: "1rem",
              }}
            >
              Publish
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContentWriter;
