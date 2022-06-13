import axios from "axios";
import React, { useEffect, useState } from "react";
import AddFestival from "./AddFestival";
import FestivalCard from "./FestivalCard";
import IsPrivate from "./IsPrivate";

const API_URL = "http://localhost:5005";

function FestivalList() {
  const [festivals, setfestivals] = useState([]);

  const getAllFestivals = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/festivals`)
      // , {
      //   headers: { Authorization: `Bearer ${storedToken}` },
      // })
      .then((response) => setfestivals(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllFestivals();
  }, []);

  return (
    <div className="FestivalListPage">

      {/* <IsPrivate>
        <AddFestival refreshFestivals={getAllFestivals} />
      </IsPrivate> */}

        <div className="festival-list">
          {festivals.map((festival) => (
            <FestivalCard key={festival.id} {...festival} />
          ))}
        </div>
     
     
    </div>
  );
}

export default FestivalList;
