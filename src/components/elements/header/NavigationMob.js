import React from "react";
import HeaderCSS from "../Header/Header.module.css";
import closeIcon from "../../../assets/icon-close-modal.svg";

const NavigationMob = ({ showMobileNav }) => {
  return (
    <div id="myNav" className={HeaderCSS.overlay}>
      <span class={HeaderCSS.closebtn} onclick="closeNav()">
        <img src={closeIcon} alt="close-icon" className={HeaderCSS.closeIcon} onClick={() => showMobileNav(false)} />
      </span>
      <div className={HeaderCSS.overlayContent}>
        <a href="#about">My Projects</a>
        <a href="#discover">Account</a>
        <a href="#discover">Logout</a>
      </div>
    </div>
  );
};

export default NavigationMob;
