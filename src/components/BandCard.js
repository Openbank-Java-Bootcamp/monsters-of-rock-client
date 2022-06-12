import React from "react";
import { Link } from "react-router-dom";

function BandCard({ id, logo, name }) {
  return (
    <div key={id} className="band-card">
      <img src={logo} alt="rock-band" />
      <Link to={`/bands/${id}`}>
        <h3>{name}</h3>
      </Link>
    </div>
  );
}

export default BandCard;
