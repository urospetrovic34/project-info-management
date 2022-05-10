import React from "react";
import HeaderCSS from "../header/Header.module.css";
import closeIcon from "../../../../assets/icon-close-modal.svg";
import Avatar from "../../../../assets/user.png";
import { useAuth } from "../../../../contexts/AuthProvider";

const NavigationMob = ({ showMobileNav }) => {
  const [authState, authDispatch] = useAuth();
  const { user } = authState;
  console.log(user);
  return (
    <div id="myNav" className={HeaderCSS.overlay}>
      <span className={HeaderCSS.closebtn}>
        <img src={closeIcon} alt="close-icon" className={HeaderCSS.closeIcon} onClick={() => showMobileNav(false)} />
      </span>
      <div className={HeaderCSS.userInfoContainer}>
        <img src={user.avatar ? user.avatar.url : Avatar} alt="PM avatar" className={HeaderCSS.userAvatar} />
        <div className={HeaderCSS.userInfo}>
          <div className={HeaderCSS.userName}>{`${user.name} ${user.surname}`}</div>
          <div className={HeaderCSS.userRole}>{user.role.name}</div>
        </div>
      </div>
      <div className={HeaderCSS.overlayContent}>
        <a href="#myProject">My Projects</a>
        <a href="#account">Account</a>
        <a href="#logout">Logout</a>
      </div>
    </div>
  );
};
//some commen
export default NavigationMob;
