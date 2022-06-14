import { Link } from "react-router-dom";

function FestivalCard({ id, image, name, dates }) {
  return (
    <div key={id} className="festival-card">
      <Link to={`/festivals/${id}`}>
        <h3 className="h3-festival-card">{name}</h3>
        <img
          className="img-festival-card"
          src={`data:image/png;base64,${image}`}
          alt="bilboard"
        />
      </Link>
      <p>{dates}</p>
    </div>
  );
}

export default FestivalCard;
