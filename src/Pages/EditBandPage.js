import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditBandPage() {
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [country, setCountry] = useState("");
  const [kind, setKind] = useState("");
  const [website, setWebsite] = useState("");
  const [video, setVideo] = useState("");

  const { bandId } = useParams();
  const navigate = useNavigate();

  console.log("bandid", bandId);

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

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    // <== ADD
    axios
      .get(`${API_URL}/api/bands/${bandId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneBand = response.data;
        setLogo(oneBand.logo);
        setName(oneBand.name);
        setImage(oneBand.image);
        setCountry(oneBand.country);
        setKind(oneBand.kind);
        setWebsite(oneBand.website);
        setVideo(oneBand.video);
      })
      .catch((error) => console.log(error));
  }, [bandId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");
    const requestBody = {
      logo,
      name,
      image,
      country,
      kind,
      website,
      video,
    };
    axios
      .put(`${API_URL}/api/bands/${bandId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate("/bands/" + bandId);
      });
  };

  const deleteBand = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/bands/${bandId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/bands");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <form className="Form-form" onSubmit={handleFormSubmit}>
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
          Update
        </button>
        <button className="btn-rock" onClick={deleteBand}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default EditBandPage;
