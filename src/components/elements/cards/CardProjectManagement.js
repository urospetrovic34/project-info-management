import React from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/46.jpg";
import Avatar2 from "../../../assets/44.jpg";
import Avatar3 from "../../../assets/32.jpg";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
const CardProjectManagement = (props) => {console.log(props.note)
    return (
        <div onClick={props.onClick} className={CardCSS.cardContainerSecond}>
            <div className={CardCSS.headerPMInfoContainer}>
                <h1 className={CardCSS.cardHeader}>{props.note.title}</h1>
            </div>
            <div className={CardCSS.headerPMInfoContainer}>
                <span className={CardCSS.PMName}>
                    {props.note.description
                        ? props.note.description
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
                {!props.note.files && props.note.files !== null ? (
                    <MdOutlineStickyNote2 className={CardCSS.noteIcon} />
                ) : (
                    <VscFileSubmodule className={CardCSS.noteIcon} />
                )}
                <div className={CardCSS.PMInfoContainer}>
                    <img
                        src={
                            props.note.author?.avatar?.url
                                ? props.note.author.avatar.url
                                : Avatar3
                        }
                        alt="PM avatar"
                        className={CardCSS.PMAvatar}
                    />
                    <div className={CardCSS.PMAdditionalInfo}>
                        <div className={CardCSS.PMNameAdditional}>
                            {`${props.note.author?.name} ${props.note.author?.surname}`}
                        </div>
                        <div className={CardCSS.PMName}>
                            {props.note.author?.description || "Member"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProjectManagement;
