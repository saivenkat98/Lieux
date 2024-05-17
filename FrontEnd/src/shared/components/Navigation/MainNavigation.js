import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Backdrop from "../UIElements/Backdrop";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const OpenSideDrawer = () => {
    setDrawerIsOpen(true);
  };
  const CloseSideDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={CloseSideDrawer} />}
      <SideDrawer OnClick={CloseSideDrawer} show={drawerIsOpen}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={OpenSideDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">lieu</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
