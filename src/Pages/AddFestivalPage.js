import axios from "axios";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Link, useNavigate } from "react-router-dom";
import useBandsList from "../components/Hooks/useBandsList";

const API_URL = "http://localhost:5005";

function AddFestivalPage(props) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [dates, setDates] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [info, setInfo] = useState("");
  const [tickets, setTickets] = useState("");
  const [bands, setBands] = useState([]);

  const [bandsList] = useBandsList();
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  const onFormChange = (e) => {
    //console.log("file to upload:", e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setImage(btoa(binaryString));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //add the selected elements to the array bandsSelected
    selected.map((elem) => bands.push(elem.value));
    const requestBody = {
      image,
      name,
      dates,
      address,
      city,
      country,
      website,
      info,
      tickets,
      bands,
    };

    const storedToken = localStorage.getItem("authToken");
    console.log("body", requestBody);

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
        setBands([]);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addpage-container">
      <div className="form-container">
        <form
          className="Form-form"
          onSubmit={handleSubmit}
          onChange={(e) => onFormChange(e)}
        >
          <label className="form-label">Image:</label>
          <input
            className="form-input"
            type="file"
            name="image"
            id="file"
            accept=".jpeg, .png, .jpg"
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

          <MultiSelect
            className="multiselect-form"
            options={bandsList.map((band) => {
              return {
                value: band,
                label: band.name,
              };
            })}
            value={selected}
            onChange={setSelected}
            labelledBy="Select bands"
          />

          <button className="btn-rock" type="submit">
            Add Festival
          </button>
        </form>
      </div>
      <div className="addBtn-container">
        <Link to="/">
          <button>Back to homePage</button>
        </Link>
      </div>
    </div>
  );
}

export default AddFestivalPage;
