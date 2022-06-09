import React from "react";
import { Link } from "react-router-dom";

function BandCard({ id, image, name }) {
  return (
    <div key={id} className="card">
      <img src={image} alt="rock-band" />
      <Link to={`/bands/${id}`}>
        <h3>{name}</h3>
      </Link>
    </div>
  );
}

export default BandCard;
