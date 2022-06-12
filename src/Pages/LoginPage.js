import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/api/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/"); // <== ADD
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="form-container">
      <form className="Form-form" onSubmit={handleLoginSubmit}>
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
        <button className="btn-rock" type="submit">
          Log in
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Don't have an account yet?</p>
      <br />
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
