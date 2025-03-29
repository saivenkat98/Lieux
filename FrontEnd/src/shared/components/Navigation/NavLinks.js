import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./NavLinks.css";
import AuthContext from "../../context/auth-context";
import Avatar from "../UIElements/Avatar";

const NavLinks = (props) => {
  const [show, setShow] = useState(false);
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>)}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATION</NavLink>
        </li>
      )}
      {auth.isLoggedIn && !props.sideDrawOpen && (
        <Avatar
          image={localStorage.image}
          alt={localStorage.name}
          style={{ width: 100, height: 100 }}
          width={64}
          onClick={() => setShow((show) => !show)}
        />
      )}
      {auth.isLoggedIn && (show || props.sideDrawOpen) && (
        <li>
          <button
            onClick={() => {
              setShow(false);
              auth.logout(); // Corrected here
            }}
          >
            {" "}
            LOGOUT{" "}
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
