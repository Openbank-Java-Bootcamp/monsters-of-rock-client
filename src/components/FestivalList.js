import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FestivalCard from './FestivalCard';

const API_URL = "http://localhost:5005";

function FestivalList() {
    const [festivals, setfestivals] = useState([]);

    const getAllFestivals = () => {

        axios
        .get(`${API_URL}/api/festivals`)
        .then((response) => setfestivals(response.data))
        .catch((error)  => console.log(error));
    };

    useEffect(() => {
        getAllFestivals();
    },[]);

  return (
    <div className="festival-list">
    {festivals.map((festival) => (
        <FestivalCard key = {festival.id} {...festival}/>
    ))}</div>
  )
}

export default FestivalList
