import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Backdrop from "../UIElements/Backdrop";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import MainHeader from "./MainHeader";
import Avatar from "../UIElements/Avatar";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const OpenSideDrawer = () => {
    setDrawerIsOpen(true);
  };
  const CloseSideDrawer = () => {
    setDrawerIsOpen(false);
  };
  const styleAvatar ={
    position: "fixed",
    right: "6.5%",
    top: "0px",
    width: "50px", // Set explicit width
    height: "50px", // Set explicit height
    display: "block", // Override the flex display
  }
  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={CloseSideDrawer} />}
      <SideDrawer OnClick={CloseSideDrawer} show={drawerIsOpen}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks sideDrawOpen={drawerIsOpen}/>
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={OpenSideDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Lieux</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
        <div className="main-navigation__image">
        <Avatar
          image={localStorage.image}
          alt={localStorage.name}
          style={styleAvatar}
          width={64}
        />
        </div>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
