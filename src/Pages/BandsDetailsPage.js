import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import website from "../assets/website.png";
import { AuthContext } from "../context/auth.context";
import "../Pages/BandsDetailsPage.css"

const API_URL = "http://localhost:5005";

export const BandsDetailsPage = () => {
  const [band, setBand] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const { bandId } = useParams();

  const getBand = () => {
    axios
      .get(`${API_URL}/api/bands/${bandId}`)
      .then((response) => {
        const oneBand = response.data;
        setBand(oneBand);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBand();
  }, []);

  return (
    <div className="bandDetail-container">
      {band && (
        <div className="bandDetails-card">
          <div className="band-column">
            <img
              className="head-image"
              src={`data:image/png;base64,${band.image}`}
              alt="band "
            />
          </div>
          <div className="band-column">
            <ReactPlayer
              className="video-player"
              url={band.video}
              playing
              controls
              volume="0.5"
            />
            <article className="article-data-bands">
              <h2>{band.name}</h2>
              <h3>Country: {band.country}</h3>
              <h3>Kind: {band.kind}</h3>
              <a href={band.website}>
                <img src={website} width="40" alt="world" />
              </a>
              <div className="btn-container">
                <Link to="/bands">
                  <button>Back to Bands</button>
                </Link>
                {isLoggedIn && (
                  <Link to={`/bands/edit/${bandId}`}>
                    <button>Edit Band</button>
                  </Link>
                )}
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};
