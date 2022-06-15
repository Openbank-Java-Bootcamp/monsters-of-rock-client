import React from "react";
import { Link } from "react-router-dom";

function BandCard({ id, logo, name }) {
  return (
    <div key={id} className="band-card">
      <Link to={`/bands/${id}`}>
        <img
          className="bandList-img"
          src={`data:logo/jpg;base64,${logo}`}
          alt="rock-band"
        />

        <h3 className="bandList-h3">{name}</h3>
      </Link>
    </div>
  );
}

export default BandCard;
