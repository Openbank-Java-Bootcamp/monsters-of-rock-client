import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

export const BandsDetailsPage = () => {
  const [band, setBand] = useState(null);

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
            <ReactPlayer url={band.video} playing controls volume="0.5" />
            <article>
              <h3>{band.country}</h3>
              <h3>Kind:{band.kind}</h3>
              <h3>Website:{band.website}</h3>
              <div className="btn-container">
                <Link to="/bands">
                  <button>Back to Bands</button>
                </Link>
                <Link to={`/bands/edit/${bandId}`}>
                  <button>Edit festival</button>
                </Link>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};
