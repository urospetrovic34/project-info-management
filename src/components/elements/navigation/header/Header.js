import React, { useState } from "react";
import logo from "../../../../assets/q-logo.png";
import HeaderCSS from "./Header.module.css";
import hamburgerIcon from "../../../../assets/icon-hamburger.svg";
import NavigationMob from "./NavigationMob";
import AuthAPI from "../../../../actions/auth";
import { useAuth } from "../../../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import Avatar from "../../../../assets/user.png";

const Header = () => {
  const [ShowMobileNavigation, setMobileNavigation] = useState(false);
  const [authState, authDispatch] = useAuth();
  const { user } = authState;
  console.log(user);

  const handleLogout = () => {
    console.log(user);
    AuthAPI.logout(authDispatch);
    console.log(user);
  };
  console.log(user);
  return (
    <div className={HeaderCSS.header}>
      <Link to={user.role.name !== "System Administrator" ? "/" : "/admin"}>
        <div className={HeaderCSS.logoHeaderContainer}>
          <img src={logo} alt="logo" className={HeaderCSS.logo} />
          <h1 className={HeaderCSS.platformName}>Q Project Info</h1>
        </div>
      </Link>

      <div className={HeaderCSS.navigationContainer}>
        {/* {user.role.name === "System Administrator" && <span className={HeaderCSS.navigationContent}>Dashboard</span>} */}
        {user.role.name === "System Administrator" && (
          <Link to="/admin" className={HeaderCSS.navigationContent}>
            <span>Dashboard</span>
          </Link>
        )}
        {user.role.name !== "System Administrator" && (
          <Link to="/" className={HeaderCSS.navigationContent}>
            <span>My Projects</span>
          </Link>
        )}
        <Link to="/account" className={HeaderCSS.navigationContent}>
          <span>Account</span>
        </Link>
        <span className={HeaderCSS.navigationContent} onClick={handleLogout}>
          Logout
        </span>
        <span className={HeaderCSS.userHeaderAvatarContainer}>
          <img
            src={Avatar}
            alt="User"
            className={HeaderCSS.userHeaderAvatar}
          />
          <div className={HeaderCSS.userNameHeader}>{`${user.name} ${user.surname}`}</div>
        </span>
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
