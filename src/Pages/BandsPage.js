import { Link } from "react-router-dom";
import BandList from "../components/BandList";

function BandsPage() {
  return (
    <div className="BandListPage">
        <BandList />
        <Link to="/">
                <button>Back to HomePage</button>
              </Link>
    </div>
  )
}

export default BandsPage