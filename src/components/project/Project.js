import React from "react";
import SubHeaderEmployee from '../elements/navigation/subHeaderEmployee/SubHeaderEmployee'
import ProjectCSS from './Project.module.css'
import Tabs from '../elements/tabs/Tabs'

export const Project = () => {
    return (
        <div className={ProjectCSS.wrapper}>
            <SubHeaderEmployee/>
            <div className={ProjectCSS.container}>
                <div className={ProjectCSS.tab_container}>
                    <Tabs/>
                </div>
            </div>
        </div>
    );
};
