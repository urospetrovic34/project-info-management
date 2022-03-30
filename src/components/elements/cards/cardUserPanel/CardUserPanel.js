import React from "react";
import CardCSS from "./CardUserPanel.module.css";

export const CardUserPanel = (props) => {
    return (
        <div className={CardCSS.container}>
            <div>
                <img
                    className={CardCSS.avatar}
                    src={props.avatar}
                    alt="user-avatar"
                />
            </div>
            <div>
                <p>{props.username}</p>
            </div>
            <div>
                <p>{props.role}</p>
            </div>
        </div>
    );
};
