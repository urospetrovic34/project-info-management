import React from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/46.jpg";
import Avatar2 from "../../../assets/44.jpg";
import Avatar3 from "../../../assets/32.jpg";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
const CardProjectManagement = (props) => {
    return (
        <div onClick={props.onClick} className={CardCSS.cardContainerSecond}>
            <div className={CardCSS.headerPMInfoContainer}>
                <h1 className={CardCSS.cardHeader}>
                    {props.note.attributes.title}
                </h1>
            </div>
            <div className={CardCSS.headerPMInfoContainer}>
                <span className={CardCSS.PMName}>
                    {props.note.attributes.description
                        ? props.note.attributes.description
                              .split("", 25)
                              .reduce(
                                  (o, c) =>
                                      o.length === 24
                                          ? `${o}${c}...`
                                          : `${o}${c}`,
                                  ""
                              )
                        : "No description available"}
                </span>
            </div>
            <div className={CardCSS.iconPmInfoContainer}>
                {!props.note.attributes.files.data ? (
                    <MdOutlineStickyNote2 className={CardCSS.noteIcon} />
                ) : (
                    <VscFileSubmodule className={CardCSS.noteIcon} />
                )}
                <div className={CardCSS.PMInfoContainer}>
                    <img
                        src={
                            props.note.attributes.author.data?.attributes.avatar
                                .data?.attributes.url
                                ? props.note.attributes.author.data.attributes
                                      .avatar.data.attributes.url
                                : Avatar3
                        }
                        alt="PM avatar"
                        className={CardCSS.PMAvatar}
                    />
                    <div className={CardCSS.PMAdditionalInfo}>
                        <div className={CardCSS.PMNameAdditional}>
                            {`${props.note.attributes.author.data?.attributes.name} ${props.note.attributes.author.data?.attributes.surname}`}
                        </div>
                        <div className={CardCSS.PMName}>
                            {props.note.attributes.author.data?.attributes
                                .description || "Member"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProjectManagement;
