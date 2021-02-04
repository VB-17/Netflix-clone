import React, { useEffect, useState } from "react";
import "./Banner.css";

import axios from "./axios";
import requests from "./Requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }

    fetchData();
  }, []);
  return (
    <header
      className="banner"
      style={{
        background: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)) ,url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <div className="banner__description">
          {truncate(movie?.overview, 150)}
        </div>
      </div>
      <div className="banner--fadeButton" />
    </header>
  );
}

export default Banner;
