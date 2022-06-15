import { useContext } from "react";
import { Link } from "react-router-dom";
import BandList from "../components/BandList";
import { AuthContext } from "../context/auth.context";

function BandsPage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="BandListPage">
      {isLoggedIn && (
        <Link to="/bands/add">
          <button className="btn-rock">Add band</button>
        </Link>
      )}
      <BandList />
      <Link to="/">
        <button className="btn-rock">Back to HomePage</button>
      </Link>
    </div>
  );
}

export default BandsPage;
