import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useParams } from "react-router-dom";
import BandCard from "../components/BandCard";
import website from "../assets/website.png";
import info from "../assets/info(1).png";
import tickets from "../assets/tickets.png";
import scroll from "../assets/scroll.png";

import { motion } from "framer-motion";
import "../Pages/FestivalDetailsPage.css";

const API_URL = "http://localhost:5005";

function FestivalDetailsPage() {
  const [festival, setFestival] = useState(null);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

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
    //to calculate the last item position
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    getFestival();
  }, []);

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
            <p>Address:{festival.address}</p>
            <p>City:{festival.city}</p>
            <p>Country:{festival.country}</p>
            <div websites-container>
              <a href={festival.tickets}>
                <img
                  className="web-logo"
                  src={tickets}
                  width="40"
                  alt="world"
                />
              </a>
              <a href={festival.info}>
                <img className="web-logo" src={info} width="40" alt="world" />
              </a>
              <a href={festival.website}>
                <img
                  className="web-logo"
                  src={website}
                  width="40"
                  alt="world"
                />
              </a>
            </div>
            <div className="btn-rock-container">
              <Link to="/">
                <button>Back to festivals</button>
              </Link>
              {isLoggedIn && (
                <Link to={`/festivals/edit/${festivalId}`}>
                  <button whileTap={{ cursor: "inherit" }}>
                    Edit festival
                  </button>
                </Link>
              )}
            </div>
          </article>
        </div>
      )}
      <div className="carousel-container">
        <motion.div
          ref={carousel}
          className="carousel"
          whileTap={{ cursor: "move" }}
        >
          {festival && (
            <motion.div
              className="slider"
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              {festival.bands.map((band) => (
                <motion.div className="item">
                  <BandCard key={band.id} {...band} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
        <img
          className="arrow"
          src={scroll}
          height="50"
          alt="skull arrow right"
        />
      </div>
    </div>
  );
}

export default FestivalDetailsPage;
