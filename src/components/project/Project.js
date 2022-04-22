import React from "react";
import SubHeaderEmployee from "../elements/navigation/subHeaderEmployee/SubHeaderEmployee";
import { useLocation } from "react-router-dom";
import ProjectCSS from "./Project.module.css";
import userHooks from "../../hooks/query/user";
import projectHooks from "../../hooks/query/project";
import Tabs from "../elements/tabs/Tabs";

export const Project = () => {
    const location = useLocation();
    const project = projectHooks.useSingleProject(
        location.pathname.split("/")[2]
    );
    //HAD TO DO IT THIS WAY BELOW,
    //BECAUSE THIS PIECE OF SHIT API DOES NOT
    //RETURN ALL THE FIELDS, EVEN AFTER MULTIPLE POPULATES
    //TO WHOM IT MAY CONCERN, FUCK STRAPI, BETTER CREATE API YOURSELF
    const findProjectManager = userHooks.useUsers(
        location.pathname.split("/")[2],
        "project_manager"
    );
    console.log(project);

    return (
        <div className={ProjectCSS.wrapper}>
            <SubHeaderEmployee
                project={project}
                projectManagerAvatar={findProjectManager.data?.[0].avatar.url}
                projectManagerId={findProjectManager.data?.[0].id}
            />
            <div className={ProjectCSS.container}>
                <div className={ProjectCSS.tab_container}>
                    <Tabs project={project} />
                </div>
            </div>
        </div>
    );
};
