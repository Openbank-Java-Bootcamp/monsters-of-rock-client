import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import logo from "../assets/monstersOfRock.png";


const Navigation = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <label className="navBar">
        <Link to="/">
          <img alt="" src={logo} className="navbar-img" />
        </Link>
      </label>
      <ul>
        {isLoggedIn ? (
          <>
            <button className="btn-rock" onClick={logOutUser}>
              Logout
            </button>
            <span>{user && user.name}</span>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="btn-rock">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn-rock">Login</button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navigation;
