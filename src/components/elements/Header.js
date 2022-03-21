import React from "react";
import logo from "../../assets/q-logo.png";
import "../../styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-header-container">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="platformName">Q Project Info</h1>
      </div>

      <div className="navigation-container">
        <span className="navigation-content">My Projects</span>
        <span className="navigation-content">Account</span>
        <span className="navigation-content">Logout</span>
      </div>
    </div>
  );
};

export default Header;
