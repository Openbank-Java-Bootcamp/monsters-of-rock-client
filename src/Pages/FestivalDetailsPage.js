import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BandCard from "../components/BandCard";

const API_URL = "http://localhost:5005";

function FestivalDetailsPage() {
  const [festival, setFestival] = useState(null);

  const { festivalId } = useParams();

  const getFestival = () => {
    axios
      .get(`${API_URL}/api/festivals/${festivalId}`)
      .then((response) => {
        const oneFestival = response.data;
        setFestival(oneFestival);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getFestival();
  }, []);

  console.log("first", festival);

  return (
    <div className="festivalDetails-container">
      {festival && (
        <div className="festivalDetails-card">
          <img
            className="bilboard"
            src={`data:image/png;base64,${festival.image}`}
            alt="bilboard"
          />
          <article className="card-article">
            <h1>{festival.name}</h1>
            <p>Dates:{festival.dates}</p>
            <p>Website:{festival.website}</p>
            <p>Address:{festival.address}</p>
            <p>City:{festival.city}</p>
            <p>Country:{festival.country}</p>
            <p>Tickets:{festival.tickets}</p>
            <p>Info:{festival.info}</p>
            <div className="btn-container">
              <Link to="/">
                <button>Back to festivals</button>
              </Link>
              <Link to={`/festivals/edit/${festivalId}`}>
                <button>Edit festival</button>
              </Link>
            </div>
          </article>
        </div>
      )}
      {festival && (
        <ul className="band-list">
          Line up:
          {festival.bands.map((band) => (
            <li>
              <BandCard key={band.id} {...band} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FestivalDetailsPage;
