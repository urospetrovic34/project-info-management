import React from "react";
import CreateProject from "../elements/createContainer/CreateProject";
import CreateCSS from "../elements/createContainer/CreateProject.module.css";
import SubHeader from "../elements/navigation/subHeader/SubHeader";

const CreateProjectPage = () => {
  return (
    <div className={CreateCSS.wrapper}>
      <SubHeader />
      <CreateProject />
    </div>
  );
};

export default CreateProjectPage;
