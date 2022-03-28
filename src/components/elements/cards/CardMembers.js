import React from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/q-logo.png";
import { FaRegWindowClose } from "react-icons/fa";

const CardMembers = () => {
  return (
    <div className={CardCSS.cardContainer}>
      <div className={CardCSS.PMInfoContainer}>
        <img src={Avatar} alt="PM avatar" className={CardCSS.PMAvatar} />
        <div className={CardCSS.PMAdditionalInfo}>
          <div className={CardCSS.PMNameAdditional}>Segun Adebayo</div>
          <div className={CardCSS.PMName}>Founder of Chakra UI</div>
        </div>
      </div>
      <FaRegWindowClose />
    </div>
  );
};

export default CardMembers;
