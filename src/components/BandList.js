import axios from "axios";
import React, { useEffect, useState } from "react";
import BandCard from "./BandCard";

const API_URL = "http://localhost:5005";

export const BandList = () => {
  const [bands, setbands] = useState([]);

  const getAllBands = () => {
    axios
      .get(`${ API_URL}/api/bands`)
      .then((response) => setbands(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllBands();
  }, []);

  return (
    <div className="container-band">
      {bands.map((band) => {
        return (
          <BandCard key={ band.id } {...band}/>
        );
      })}
    </div>
  );
};
