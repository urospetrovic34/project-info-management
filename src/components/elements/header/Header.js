import React from "react";
import { useState } from "react";
import logo from "../../../assets/q-logo.png";
import HeaderCSS from "./Header.module.css";
import hamburgerIcon from "../../../assets/icon-hamburger.svg";
import NavigationMob from "./NavigationMob";
// import closeIcon from "../../../assets/icon-close-modal.svg";

const Header = () => {
  const [ShowMobileNavigation, setMobileNavigation] = useState(false);
  return (
    <div className={HeaderCSS.header}>
      <div className={HeaderCSS.logoHeaderContainer}>
        <img src={logo} alt="logo" className={HeaderCSS.logo} />
        <h1 className={HeaderCSS.platformName}>Q Project Info</h1>
      </div>

      <div className={HeaderCSS.navigationContainer}>
        <span className={HeaderCSS.navigationContent}>My Projects</span>
        <span className={HeaderCSS.navigationContent}>Account</span>
        <span className={HeaderCSS.navigationContent}>Logout</span>
      </div>

      <img
        src={hamburgerIcon}
        alt="icon-hamburger"
        className={HeaderCSS.hamburgerIcon}
        onClick={() => setMobileNavigation(true)}
      />
      {ShowMobileNavigation ? <NavigationMob showMobileNav={setMobileNavigation} /> : null}
    </div>
  );
};

export default Header;
