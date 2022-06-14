import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BandCard from "../components/BandCard";
import { AuthContext } from "../context/auth.context";
import { motion } from "framer-motion";
import "../Pages/FestivalDetailsPage.css"

const API_URL = "http://localhost:5005";

function FestivalDetailsPage() {
  const [festival, setFestival] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
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
              {isLoggedIn && (
                <Link to={`/festivals/edit/${festivalId}`}>
                  <button>Edit festival</button>
                </Link>
              )}
            </div>
          </article>
        </div>
      )}
      <motion.div className="slider-container">
        {festival && (
          <motion.div
            className="slider"
            drag="x"
            dragConstraints={{ right:300,left:-300 }}
          >
            {festival.bands.map((band) => (
              <motion.div className="item">
                <BandCard key={band.id} {...band} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div> 
    </div>
  );
}

export default FestivalDetailsPage;
