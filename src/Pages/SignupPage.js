import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/api/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="form-container">
      <form className="Form-form" onSubmit={handleSignupSubmit}>
        <label className="form-label">Email:</label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          placeholder="Email address"
        />

        <label className="form-label">Password:</label>
        <input
          className="form-input"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="Enter your password"
        />

        <label className="form-label">Name:</label>
        <input
          className="form-input"
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          placeholder="Full name"
        />

        <button className="btn-rock" type="submit">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <br />
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
