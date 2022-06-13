import { Link } from 'react-router-dom';
import FestivalList from '../components/FestivalList';
  
export default function HomePage() {
     return (
       <div className='homepage'> 
       <Link to="/bands">
              <button className="btn-rock">Bands</button>
            </Link>
       <FestivalList/>
       </div>
     )
   };