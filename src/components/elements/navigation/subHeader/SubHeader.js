import React from "react";
import SubHeaderCSS from "../subHeader/SubHeader.module.css";
import subLogo from "../../../../assets/subheader.png";
import { FaReact } from "react-icons/fa";
import Input from "../../input/Input";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthProvider";
import Button from "../../button/Button";
import { useLocation } from "react-router-dom";

const SubHeader = (props) => {
  const [authState, authDispatch] = useAuth();
  const { user } = authState;

  const location = useLocation();

  const btnCreateProjectStyle = {
    backgroundColor: "#319795",
    color: "white",
    fontWeight: "600",
    marginLeft: "20px",
  };
  return (
    <div className={SubHeaderCSS.container}>
      <div className={SubHeaderCSS.logo_container}>
        <img src={subLogo} alt="logo" className={SubHeaderCSS.logo} />
        <div>
          {location.pathname === "/projects/create" && <h2 className={SubHeaderCSS.title}>Create Project</h2>}
          {location.pathname === "/" && <h2 className={SubHeaderCSS.title}>My Projects</h2>}
          {location.pathname === "/projects/create" && <p className={SubHeaderCSS.paragraph}>Create a new project</p>}
          {location.pathname === "/" && <p className={SubHeaderCSS.paragraph}>Here you'll find all your projects</p>}
        </div>
      </div>
      <div className={SubHeaderCSS.inputBtnContainer} onChange={props.onChange}>
        {location.pathname === "/" && <Input placeholder={"Search projects"} />}
        {user.role.name === "Project Manager" && location.pathname === "/" && (
          <Link to="/projects/create" className={SubHeaderCSS.projectBtn}>
            <Button value={"NewProject"} text={"New Project"} style={btnCreateProjectStyle} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
