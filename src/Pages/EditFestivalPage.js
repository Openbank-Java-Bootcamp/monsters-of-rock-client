import axios from "axios";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useParams } from "react-router-dom";
import useBandsList from "../components/Hooks/useBandsList";

const API_URL = "http://localhost:5005";

function EditFestivalPage() {
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

  const { festivalId } = useParams();

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

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    // <== ADD
    axios
      .get(`${API_URL}/api/festivals/${festivalId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneFestival = response.data;
        setImage(oneFestival.image);
        setName(oneFestival.name);
        setDates(oneFestival.dates);
        setAddress(oneFestival.address);
        setCity(oneFestival.city);
        setCountry(oneFestival.country);
        setWebsite(oneFestival.website);
        setInfo(oneFestival.info);
        setTickets(oneFestival.tickets);
        setBands(oneFestival.bands);
      })
      .catch((error) => console.log(error));
  }, [festivalId]);

  const handleFormSubmit = (e) => {
    // <== ADD
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    // Create an object representing the body of the PUT request
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

    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/festivals/${festivalId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate("/festivals/" + festivalId);
      });
  };

  const deleteFestival = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/festivals/${festivalId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <form
        className="Form-form"
        onSubmit={handleFormSubmit}
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
          Update
        </button>
        <button className="btn-rock" onClick={deleteFestival}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default EditFestivalPage;
