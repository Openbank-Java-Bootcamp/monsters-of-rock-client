import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddBandPage(props) {
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [country, setCountry] = useState("");
  const [kind, setKind] = useState("");
  const [website, setWebsite] = useState("");
  const [video, setVideo] = useState("");

  const navigate = useNavigate();

  const onImageChange = (e) => {
    //console.log("file to upload:", e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoadedImage.bind(this);

      reader.readAsBinaryString(file);
    }
  };

  const onLogoChange = (e) => {
    //console.log("file to upload:", e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoadedLogo.bind(this);

      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoadedLogo = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setLogo(btoa(binaryString));
  };

  const _handleReaderLoadedImage = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setImage(btoa(binaryString));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      logo,
      name,
      image,
      country,
      kind,
      website,
      video,
    };

    const storedToken = localStorage.getItem("authToken");
    console.log("body", requestBody);

    axios
      .post(`${API_URL}/api/bands`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setLogo("");
        setName("");
        setImage("");
        setCountry("");
        setKind("");
        setWebsite("");
        setVideo("");
        navigate("/bands");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addpage-container">
      <div className="form-container">
        <form className="Form-form" onSubmit={handleSubmit}>
          <label className="form-label">Logo:</label>
          <input
            className="form-input"
            type="file"
            name="logo"
            id="file"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => onLogoChange(e)}
          />

          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="form-label">Image:</label>
          <input
            className="form-input"
            type="file"
            name="image"
            id="file"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => onImageChange(e)}
          />

          <label className="form-label">Country:</label>
          <input
            className="form-input"
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <label className="form-label">Kind:</label>
          <input
            className="form-input"
            type="text"
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          />

          <label className="form-label">Website:</label>
          <input
            className="form-input"
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <label className="form-label">Video:</label>
          <input
            className="form-input"
            type="text"
            name="video"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />

          <button className="btn-rock" type="submit">
            Add Band
          </button>
        </form>
      </div>
      <div className="addBtn-container">
        <Link to="/bands">
          <button>Back to Bands</button>
        </Link>
      </div>
    </div>
  );
}

export default AddBandPage;
