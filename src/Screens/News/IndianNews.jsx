import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./IndianNews.css";
import { Card, Grid, Typography } from "@mui/material";

const IndianNews = () => {
  const [news, setNews] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userid = localStorage.getItem("email");

    axios
      .get(`http://localhost:8080/users/${userid}`)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err.name, err.message));
  }, []);

  useEffect(() => {
    // Update API_URL with the location parameter
    const API_KEY = "0d3a2f07e77443c291a86b824d47cf6f";
    const API_URL = `https://newsapi.org/v2/top-headlines?country=in`;
    const params = {
      apiKey: API_KEY,
    };

    axios
      .get(API_URL, {
        params: params,
      })
      .then((response) => {
        console.log(response.data.articles);
        setNews(response.data.articles);

        // console.log(`newsData: ${newsData}`)
      })
      .catch((error) => {
        alert(`${error.name}: ${error.message}`);
      });
  }, []);

  return (
    <div>
      <div className="content">
        <div className="jumbotron">
          <img
            src={
              "https://www.aeologic.com/blog/wp-content/uploads/2022/11/Importance-of-Modern-Technology-In-Agriculture-Industry-1180x664.png"
            }
            alt="Jumbotron"
          />
          <div className="overlay"></div>
          <h2>Indian News</h2>
        </div>

        <Grid container spacing={5} marginTop="1rem">
          {news.map((article, index) => (
           <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <a href={article.url} target="_blank">
                <Card sx={{ height: "100%", backgroundColor: "#ececec" }}>
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <Typography variant="h4">{article.title}</Typography>
                  <Typography>{article.source.name}</Typography>
                </Card>
              </a>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default IndianNews;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '../Style/IndianNews.css';

// const IndianNews = () => {
//   const [news, setNews] = useState([]);
//   const [location, setLocation] = useState(''); // State or city location in India

//   useEffect(() => {
//     // Update API_URL with the location parameter
//     const API_KEY = '0d3a2f07e77443c291a86b824d47cf6f';
//     const API_URL = `https://newsapi.org/v2/top-headlines?country=in&category=${location}&apiKey=${API_KEY}`;

//     axios
//       .get(API_URL)
//       .then((response) => {
//         setNews(response.data.articles);
//       })
//       .catch((error) => {
//         console.error('Error fetching news:', error);
//       });
//   }, [location]); // Run the effect whenever the location changes

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   return (
//     <div>
//       <div className="sidebar">
//         <h2>Dashboard</h2>
//         <Link to="/home">Home</Link>
//         <Link to="/weatherInfo">Current Weather</Link>
//         <Link to="/forecast">Forecast</Link>
//         <Link to="/now/weather">Search for Other Country</Link>
//         <Link to="/weather/weekly">Other Country Weekly Data</Link>
//         <Link to="/news">News</Link>
//         <Link to="/">Logout</Link>
//       </div>

//       <div className="content">
//         <div className="jumbotron">
//           <img
//             src={
//               '../images/sunset-sea-ocean-sandy-beach-waves-red-sky-clouds-summer-landscape-wallpaper-for-desktop-3840×2400-wallpaper-preview.jpg'
//             }
//             alt="Jumbotron"
//           />
//           <div className="overlay"></div>
//           <h2>Indian News</h2>
//           <div>
//             {/* Dropdown to select the location */}
//             <label htmlFor="location">Select Location:</label>
//             <select
//               id="location"
//               value={location}
//               onChange={handleLocationChange}
//             >
//               <option value="">All</option>
//               <option value="Delhi">Delhi</option>
//               <option value="Mumbai">Mumbai</option>
//               {/* Add more options for other states or cities */}
//             </select>
//           </div>
//         </div>

//         <div className="card-container">
//           {news.map((article, index) => (
//             <div key={index} className="card">
//               <img src={article.urlToImage} alt={article.title} />
//               <div className="card-body">
//                 <h3>{article.title}</h3>
//                 <p>{article.description}</p>
//                 <a href={article.url} target="_blank" rel="noopener noreferrer">
//                   Read more
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndianNews;
