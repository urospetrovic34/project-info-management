import React from "react";
import HeaderCSS from "../header/Header.module.css";
import closeIcon from "../../../../assets/icon-close-modal.svg";
import Avatar from "../../../../assets/user.png";
import { useAuth } from "../../../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import AuthAPI from "../../../../actions/auth";

const NavigationMob = ({ showMobileNav }) => {
  const [authState, authDispatch] = useAuth();
  const { user } = authState;
  console.log(user);
  const handleLogout = () => {
    console.log(user);
    AuthAPI.logout(authDispatch);
    console.log(user);
  };
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
        {user.role.name === "System Administrator" && (
          <Link to="/admin/users" className={HeaderCSS.navigationContent}>
            <span onClick={() => showMobileNav(false)}>Dashboard</span>
          </Link>
        )}
        {user.role.name !== "System Administrator" && (
          <Link to="/" className={HeaderCSS.navigationContent}>
            <span onClick={() => showMobileNav(false)}>My Projects</span>
          </Link>
        )}
        <Link to="/account" className={HeaderCSS.navigationContent}>
          <span onClick={() => showMobileNav(false)}>Account</span>
        </Link>
        <span onClick={handleLogout}>
          <a href="#">Logout</a>
        </span>
      </div>
    </div>
  );
};
//some commen
export default NavigationMob;
