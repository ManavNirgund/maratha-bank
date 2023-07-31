import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/Service/utilities/auth";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function CustomerLogin() {
  const nav = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [isSigninDisabled, setIsSigninDisabled] = useState(false);

  const redirectPath = location.state?.path || "/";

  const altText = () => {
    return (
      <div>
        <a href="https://www.freepik.com/free-vector/privacy-policy-concept-illustration_20547283.htm#query=login&position=0&from_view=keyword&track=sph">
          Image by storyset on Freepik
        </a>
      </div>
    );
  };

  const formikValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
  });

  const formik = useFormik({
    initialValues: formikValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsSigninDisabled(true);
      axios
        .post(
          "http://localhost:8081/customer/authenticate",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setIsSigninDisabled(false);
          const token = res.data;

          console.log(token);
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.username);
          console.log(values.username, values.password, token);
          auth.login(values.username, values.password, token);
          if (values.username == "admin") {
            localStorage.setItem("asAdmin", true);
          } else {
            localStorage.setItem("asAdmin", false);
          }
          formik.resetForm();
          nav(redirectPath, { replace: true });
        })
        .catch((res) => {
          alert(res.response.data.message);
          setIsSigninDisabled(false);
          formik.resetForm();
        });
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "3rem",
        marginBottom: "3rem",
        backgroundColor: "rgb(173, 2, 83)",
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box
        component="form"
        noValidate
        className="mt-5 p-5 pt-5"
        onSubmit={formik.handleSubmit}
      >
        <Typography
          variant="h5"
          sx={{
            color: "antiquewhite",
          }}
        >
          Customer login
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && formik.errors.username ? true : false
                }
                helperText={formik.touched.username && formik.errors.username}
                InputProps={{
                  style: { color: "antiquewhite" },
                }}
                InputLabelProps={{
                  style: { color: "antiquewhite" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "antiquewhite",
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  style: { color: "antiquewhite" },
                }}
                InputLabelProps={{
                  style: { color: "antiquewhite" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "antiquewhite",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                startIcon={<PersonAdd />}
                disabled={isSigninDisabled}
              >
                {isSigninDisabled ? (
                  <CircularProgress size={24} color="primary" />
                ) : (
                  "Signin"
                )}
              </Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={formik.handleReset}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item>
          <Typography
            sx={{
              color: "white",
              marginTop: "-2rem",
            }}
          >
            Don't have an account?
          </Typography>
          <Button variant="link">
            <Link to={"/register"} style={{ fontWeight: "bolder" }}>
              Sign up
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CustomerLogin;
