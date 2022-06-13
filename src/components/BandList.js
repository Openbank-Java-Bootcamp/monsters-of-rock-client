import useBandsList from "./Hooks/useBandsList";
import BandCard from "./BandCard";


const BandList = () => {
  const [ bands ] = useBandsList();  

  return (
    <div className="band-list">
      {bands.map((band) => {
        return (
          <BandCard key={ band.id } {...band}/>
        );
      })}
    </div>
  );
};

export default BandList;