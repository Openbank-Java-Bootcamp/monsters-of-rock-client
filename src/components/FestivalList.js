import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import FestivalCard from "./FestivalCard";
import SearchBar from "./SearchBar";

const API_URL = "http://localhost:5005";

function FestivalList() {
  const [festivals, setfestivals] = useState([]);
  const [updateFestivals, setUpdateFestivals] = useState(festivals);
  const { isLoggedIn } = useContext(AuthContext);

  const getAllFestivals = () => {
    axios
      .get(`${API_URL}/api/festivals`)
      .then((response) => {
        setfestivals(response.data);
        setUpdateFestivals(response.data);
      })
      .catch((error) => console.log(error));
  };

  const filterFestivalsList = (str) => {
    let filteredFestivals;
    console.log("str", str);
    if (str === "") {
      filteredFestivals = festivals;
    } else {
      filteredFestivals = updateFestivals.filter((eachFestival) => {
        return (eachFestival.country.toLowerCase().includes(str.toLowerCase()) || eachFestival.name.toLowerCase().includes(str.toLowerCase()));
      });
    }
    console.log("festivaillist", filteredFestivals);
    setUpdateFestivals(filteredFestivals);
  };

  useEffect(() => {
    getAllFestivals();
  }, []);

  return (
    <div className="FestivalListPage">
      <div className="festivalList btn-container">
      <Link to="/bands">
          <button className="btn-rock">Bands</button>
        </Link>        
        {isLoggedIn && (
          <Link to="/add-festival">
            <button className="btn-rock">Add Festival</button>
          </Link>
        )}        
        <SearchBar filterFestivals={filterFestivalsList} />
      </div>
      <div className="festival-list">
        {updateFestivals.map((festival) => (
          <FestivalCard key={festival.id} {...festival} />
        ))}
      </div>
    </div>
  );
}

export default FestivalList;
