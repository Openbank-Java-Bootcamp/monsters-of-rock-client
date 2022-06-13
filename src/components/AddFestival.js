import axios from "axios";
import React, { useState } from "react";

const API_URL = "http://localhost:5005";

function AddFestival() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [dates, setDates] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [info, setInfo] = useState("");
  const [tickets, setTickets] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      image,
      name,
      dates,
      address,
      city,
      country,
      website,
      info,
      tickets
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/festivals`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImage("");
        setName("");
        setDates("");
        setAddress("");
        setCity("");
        setCountry("");
        setWebsite("");
        setInfo("");
        setTickets("");
      })
      .catch((error) => console.log("error"));
  };

  return (
    <div className="form-container">
      <form className="Form-form" onSubmit={handleSubmit}>
        <label className="form-label">Image:</label>
        <input
        className="form-input"
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label className="form-label">Name:</label>
        <input
        className="form-input"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label">Dates:</label>
        <input
        className="form-input"
          type="text"
          name="dates"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
        />

        <label className="form-label">Address:</label>
        <input
        className="form-input"
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label className="form-label">City:</label>
        <input
        className="form-input"
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label className="form-label">Country:</label>
        <input
        className="form-input"
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <label className="form-label">Website:</label>
        <input
        className="form-input"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <label className="form-label">Info:</label>
        <input
            className="form-input"
          type="text"
          name="info"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />

        <label className="form-label">Tickets:</label>
        <input
          className="form-input"
          type="text"
          name="tickets"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
        />
        
        <button className="btn-rock"  type="submit">Add Festival</button>
      </form>
    </div>
  );
}

export default AddFestival;
