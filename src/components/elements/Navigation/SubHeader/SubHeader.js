import React from 'react';
import SubHeaderCSS from '../SubHeader/SubHeader.module.css'
import logo from "../../../../assets/q-logo.png";
import InputCSS from "../../Input/Input.module.css";
import { FaReact } from 'react-icons/fa';
import Input from '../../Input/Input';

const ProjectBar = () => {
    return (
        <div className={SubHeaderCSS.container}>
            <div className={SubHeaderCSS.logo_container}>
                <img src={logo} alt="logo" className={SubHeaderCSS.logo} />
                <div>
                    <h2 className={SubHeaderCSS.title}>My Projects</h2>
                    <p className={SubHeaderCSS.paragraph}>Here you'll find all your projects</p>
                </div>
            </div>
            <div className={InputCSS.input_container}>
                <FaReact className={InputCSS.react_icon} />
                <Input />
            </div>

        </div>
    )
}

export default ProjectBar