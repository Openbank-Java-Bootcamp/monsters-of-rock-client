import useBandsList from "./Hooks/useBandsList";
import BandCard from "./BandCard";


export const BandList = () => {
  const [ bands ] = useBandsList();  

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
