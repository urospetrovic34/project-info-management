import React from "react";
import logo from "../../../assets/q-logo.png";
import HeaderCSS from "./Header.module.css";

const Header = () => {
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
    </div>
  );
};

export default Header;
