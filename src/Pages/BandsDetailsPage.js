import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';



export const BandsDetailsPage = () => {
    const[band, setBand] = useState(null);

    const { bandId } = useParams();

    const getBand = () => {

       
    }
  return (
    <div>BandsDetailsPage</div>
  )
}
