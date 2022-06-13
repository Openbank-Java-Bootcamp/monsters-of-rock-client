import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5005";

const useBandsList = (initialState = []) => {
    const [bands, setBands] = useState(initialState);

    const getAllBands = () => {
        axios
          .get(`${ API_URL}/api/bands`)
          .then((response) => setBands(response.data))
          .catch((error) => console.log(error));
      };

    useEffect(() => {
        getAllBands()
        
    },[]);

    return [bands];
};

export default useBandsList;