import React from "react";
import SubHeaderEmployeeCSS from "../subHeaderEmployee/SubHeaderEmployee.module.css";
import logo from "../../../../assets/q-logo.png";

const SubHeaderEmployee = () => {
  return (
    <div className={SubHeaderEmployeeCSS.container}>
      <div className={SubHeaderEmployeeCSS.logo_container}>
        <img src={logo} alt="logo" className={SubHeaderEmployeeCSS.logo} />
        <div>
          <h2 className={SubHeaderEmployeeCSS.title}>The New Alpha</h2>
          <p className={SubHeaderEmployeeCSS.paragraph}>
            The New Alpha is a long running project. <br></br> We're creating sales pages for the clinets's business,{" "}
            <br /> creating blog posts, and managing the Shopify <br /> store{" "}
          </p>
        </div>
      </div>
      <div className={SubHeaderEmployeeCSS.info}>
        <div>
          <div className={SubHeaderEmployeeCSS.project_manager}>
            <h4>Project Manager</h4>
            <img src={logo} alt="logo" className={SubHeaderEmployeeCSS.profile_picture} />
          </div>
        </div>
        <div>
          <div className={SubHeaderEmployeeCSS.employees}>
            <h4>Employees</h4>
            <div className={SubHeaderEmployeeCSS.profile_pictures}>
              <img src={logo} alt="logo" className={SubHeaderEmployeeCSS.profile_picture} />
              <img src={logo} alt="logo" className={SubHeaderEmployeeCSS.profile_picture} />
              <img src={logo} alt="logo" className={SubHeaderEmployeeCSS.profile_picture} />
              <span className={SubHeaderEmployeeCSS.more}>+5 more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeaderEmployee;
