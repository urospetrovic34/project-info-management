import React from "react";
import SubHeaderEmployee from '../elements/navigation/subHeaderEmployee/SubHeaderEmployee'
import { useLocation } from "react-router-dom";
import ProjectCSS from './Project.module.css'
import projectHooks from "../../hooks/query/project";
import Tabs from '../elements/tabs/Tabs'

export const Project = () => {

    const location = useLocation();
    const project = projectHooks.useSingleProject(location.state.id);
    console.log(project);

    return (
        <div className={ProjectCSS.wrapper}>
            <SubHeaderEmployee project={project}/>
            <div className={ProjectCSS.container}>
                <div className={ProjectCSS.tab_container}>
                    <Tabs project={project}/>
                </div>
            </div>
        </div>
    );
};
