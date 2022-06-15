import { Divider, Input } from "antd";
import { useState } from "react";

function SearchBar({filterFestivals}) {
  
  const [search, setSearch] = useState("");

  const handleSearchInput = (e) => {
    e.preventDefault();    
    setSearch(e.target.value);
    console.log("target",e.target.value)
   filterFestivals(e.target.value);
  };

  return (
    <div className="searchBar-container">
      <Divider className="searchBar-divider">Search</Divider>
      <Input value={search} type="text" onChange={handleSearchInput}/>
    </div>
  );
}

export default SearchBar;
