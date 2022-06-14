import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import FestivalCard from "./FestivalCard";

const API_URL = "http://localhost:5005";

function FestivalList() {
  const [festivals, setfestivals] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const getAllFestivals = () => {
    axios
      .get(`${API_URL}/api/festivals`)
      .then((response) => setfestivals(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllFestivals();
  }, []);

  return (
    <div className="FestivalListPage">
      <div className="festivalList btn-container">
        {isLoggedIn && (
          <Link to="/add-festival">
            <button className="btn-rock">Add Festival</button>
          </Link>
        )}
        <Link to="/bands">
          <button className="btn-rock">Bands</button>
        </Link>
      </div>

      <div className="festival-list">
        {festivals.map((festival) => (
          <FestivalCard key={festival.id} {...festival} />
        ))}
      </div>
    </div>
  );
}

export default FestivalList;
