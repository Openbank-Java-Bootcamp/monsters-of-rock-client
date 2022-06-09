import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to="/">
        <button>MONSTERS OF ROCK</button>
      </Link>

      {/* {isLoggedIn && (
        <> */}
          <Link to="/projects">
            <button>Projects</button>
           </Link>
          {/* <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}  */}

      {/* {!isLoggedIn && (
        <> */}
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
         {/* </>
      )} */}
    </nav> 
  );
}

export default Navbar
