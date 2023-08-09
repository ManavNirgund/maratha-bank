import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import forecast_today from "../../../Assets/Images/cartoon-giffs/Weather/Weather.gif";
import forecast_weekly from "../../../Assets/Images/cartoon-giffs/Weather/Weather (1).gif";
import "./Forecast.css";

const Forecast = () => {
  // const [isForecasrSelected, setIsForecastSelected] = useState(true);
  const [isWeatherNowSelected, setWeatherNowSelected] = useState(true);
  const [isWeatherWeeklySelected, setIsWeatherWeeklySelected] = useState(false);

  // const [forecastData, setForecastData] = useState(null);
  const [weatherNowData, setWeatherNowData] = useState(null);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null);

  const initialValues = {
    city: "",
    country: "",
  };

  const weatherNowFormik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      axios
        .get(`http://localhost:8080/api/now/${values.country}/${values.city}`)
        .then((res) => {
          console.log(res.data);
          setWeatherNowData(res.data);
        })
        .catch((err) => {
          alert(`${err.name}: ${err.message}`);
        });
    },
  });

  const weatherWeeklyFormik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      axios
        .get(
          `http://localhost:8080/api/weekly/${values.country}/${values.city}`
        )
        .then((res) => {
          console.log(res.data.entries);
          setWeeklyWeatherData(res.data.entries);
        })
        .catch((err) => {
          alert(`${err.name}: ${err.message}`);
          console.log(err);
        });
    },
  });

  const tableStyle = {
    minWidth: "650px",
    maxWidth: "80%",
    borderCollapse: "collapse",
    marginBottom: "2rem",
  };

  const cellStyle = {
    border: "1px solid black",
    padding: "8px",
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: "lightgray",
  };

  return (
    <Container
      sx={{
        marginTop: "5vh",
      }}
    >
      <div>
        <Button
          variant={isWeatherNowSelected === true ? "contained" : "outlined"}
          onClick={() => {
            setIsWeatherWeeklySelected(false);
            setWeatherNowSelected(true);
            setWeeklyWeatherData(null);
          }}
          sx={{
            border: "2px solid #870040",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            fontSize: "1rem",
            backgroundColor:
              isWeatherNowSelected === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
          }}
        >
          Weather Now
        </Button>
        <Button
          variant={isWeatherWeeklySelected === true ? "contained" : "outlined"}
          onClick={() => {
            setIsWeatherWeeklySelected(true);
            setWeatherNowSelected(false);
            setWeatherNowData(null);
          }}
          sx={{
            border: "2px solid #870040",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            fontSize: "1rem",
            backgroundColor:
              isWeatherWeeklySelected === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
            },
          }}
        >
          Weekly Weather
        </Button>
      </div>

      {isWeatherNowSelected && (
        <div className="container">
          <img
            src={forecast_today}
            alt="Weather gif"
            style={{ alignSelf: "flex-end" }}
          />
          <Container
            maxWidth="sm"
            sx={{
              marginBottom: "3rem",
              marginTop: "3rem",
              height: "70%",
              width: "455.75px",
              backgroundColor: "#ececec",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.75)",
            }}
          >
            <Box
              component="form"
              noValidate
              className="mt-5 p-5 pt-5"
              onSubmit={weatherNowFormik.handleSubmit}
            >
              <Typography
                variant="h5"
                sx={{ color: "GrayText" }}
                align="center"
              >
                Weather of the world
              </Typography>
              <Grid
                container
                spacing={2}
                className="mt-4"
                display="flex"
                alignItems="center"
                sx={{
                  marginTop: "1rem",
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="city"
                    name="city"
                    label="City"
                    value={weatherNowFormik.values.city}
                    onChange={weatherNowFormik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="country"
                    name="country"
                    label="Country"
                    value={weatherNowFormik.values.country}
                    onChange={weatherNowFormik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                      display: "flex",
                      alignSelf: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    Get Data
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="error"
                    onClick={() => setIsWeatherWeeklySelected(false)}
                    sx={{
                      display: "flex",
                      alignSelf: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      )}

      {isWeatherWeeklySelected && (
        <div className="container">
          <img src={forecast_weekly} alt="forecast gif" />
          <Container
            maxWidth="sm"
            sx={{
              marginBottom: "3rem",
              marginTop: "3rem",
              height: "70%",
              width: "455.75px",
              backgroundColor: "#ececec",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.75)",
            }}
          >
            <Box
              component="form"
              noValidate
              className="mt-5 p-5 pt-5"
              onSubmit={weatherWeeklyFormik.handleSubmit}
            >
              <Typography
                variant="h5"
                sx={{ color: "GrayText" }}
                align="center"
              >
                Weather of the world
              </Typography>
              <Grid
                container
                spacing={2}
                className="mt-4"
                display="flex"
                alignItems="center"
                sx={{
                  marginTop: "1rem",
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="city"
                    name="city"
                    label="City"
                    value={weatherWeeklyFormik.values.city}
                    onChange={weatherWeeklyFormik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="country"
                    name="country"
                    label="Country"
                    value={weatherWeeklyFormik.values.country}
                    onChange={weatherWeeklyFormik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                      display: "flex",
                      alignSelf: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    Get Data
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="error"
                    onClick={() => setIsWeatherWeeklySelected(false)}
                    sx={{
                      display: "flex",
                      alignSelf: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      )}

      {weatherNowData && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Climate</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{weatherNowData.name}</TableCell>
              <TableCell>{weatherNowData.celsiusTemperature}</TableCell>
              <TableCell>
                {weatherNowData.description}{" "}
                <img
                  src={`http://openweathermap.org/img/w/${weatherNowData.weatherIcon}.png`}
                />{" "}
              </TableCell>
              <TableCell>{weatherNowData.date}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

      {weeklyWeatherData && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Table sx={tableStyle}>
            <TableHead>
              <TableRow>
                <TableCell sx={headerCellStyle}>Date</TableCell>
                <TableCell sx={headerCellStyle}>Time</TableCell>
                <TableCell sx={headerCellStyle}>Temperature</TableCell>
                <TableCell sx={headerCellStyle}>Climate</TableCell>
              </TableRow>
            </TableHead>

            {weeklyWeatherData.map((item, index) => {
              const dateObj = new Date(item.date);
              const localTime = dateObj.toLocaleString();
              const [date, time] = localTime.split(", ");

              return (
                <TableBody key={index}>
                  <TableRow>
                    <TableCell sx={cellStyle}>{date}</TableCell>
                    <TableCell sx={cellStyle}>{time}</TableCell>
                    <TableCell sx={cellStyle}>
                      {item.celsiusTemperature}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {item.description}{" "}
                      <img
                        src={`http://openweathermap.org/img/w/${item.weatherIcon}.png`}
                      />{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Forecast;
