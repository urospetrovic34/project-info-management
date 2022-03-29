import React, { useState } from "react";
import logo from "../../../../assets/q-logo.png";
import HeaderCSS from "./Header.module.css";
import hamburgerIcon from "../../../../assets/icon-hamburger.svg";
import NavigationMob from "./NavigationMob";
import AuthAPI from "../../../../actions/auth";
import { useAuth } from "../../../../contexts/AuthProvider";

const Header = () => {
    const [ShowMobileNavigation, setMobileNavigation] = useState(false);
    const [authState, authDispatch] = useAuth();
    console.log(authState)

    return (
        <div className={HeaderCSS.header}>
            <div className={HeaderCSS.logoHeaderContainer}>
                <img src={logo} alt="logo" className={HeaderCSS.logo} />
                <h1 className={HeaderCSS.platformName}>Q Project Info</h1>
            </div>

            <div className={HeaderCSS.navigationContainer}>
                <span className={HeaderCSS.navigationContent}>My Projects</span>
                <span className={HeaderCSS.navigationContent}>Account</span>
                <span
                    className={HeaderCSS.navigationContent}
                    onClick={() => AuthAPI.logout(authDispatch)}
                >
                    Logout
                </span>
            </div>

            <img
                src={hamburgerIcon}
                alt="icon-hamburger"
                className={HeaderCSS.hamburgerIcon}
                onClick={() => setMobileNavigation(true)}
            />
            {ShowMobileNavigation ? (
                <NavigationMob showMobileNav={setMobileNavigation} />
            ) : null}
        </div>
    );
};

export default Header;
