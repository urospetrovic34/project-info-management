import React from "react";
import HeaderCSS from "../header/Header.module.css";
import closeIcon from "../../../../assets/icon-close-modal.svg";

const NavigationMob = ({ showMobileNav }) => {
  return (
    <div id="myNav" className={HeaderCSS.overlay}>
      <span className={HeaderCSS.closebtn}>
        <img src={closeIcon} alt="close-icon" className={HeaderCSS.closeIcon} onClick={() => showMobileNav(false)} />
      </span>
      <div className={HeaderCSS.overlayContent}>
        <a href="#myProject">My Projects</a>
        <a href="#account">Account</a>
        <a href="#logout">Logout</a>
      </div>
    </div>
  );
};
//some comment
export default NavigationMob;
