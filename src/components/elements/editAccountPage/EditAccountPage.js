import React from 'react';
import EditAccountPageCSS from "../editAccountPage/EditAccountPage.module.css";
import logo from "../../../assets/q-logo.png";
import File from "../../elements/file/File";
import Input from '../input/Input';
import Label from '../label/Label';
import Button from '../button/Button';




const EditAccountPage = () => {
    return (
        <div className={EditAccountPageCSS.container}>
            <div className={EditAccountPageCSS.acc_informations}>
                <h3 className={EditAccountPageCSS.title}>Edit Information</h3>
                <div className={EditAccountPageCSS.flex}>
                    <img src={logo} alt="profile_picture" className={EditAccountPageCSS.logo} />
                </div>
                <File />
                <h3 className={EditAccountPageCSS.gray_title}>Account Information</h3>
                <div className={EditAccountPageCSS.grid}>
                    <Label text="First Name:" />
                    <Input placeholder="First Name" />

                    <Label text="Last Name:" />
                    <Input placeholder="Last Name" />

                    <Label text="Email:" />
                    <Input type="email" placeholder="Email" />

                    <Label text="Role:" />
                    <Input placeholder="Employee" type="text" />
                </div>
                <h3 className={EditAccountPageCSS.gray_title}>Change Passowrd</h3>
                <div className={EditAccountPageCSS.grid}>

                    <Label text="New Password:" />
                    <Input placeholder="New Password" type="password" />

                    <Label text="Confirm Password:" />
                    <Input placeholder="Confirm Password" type="password" />
                </div>
                <div className={EditAccountPageCSS.button} >
                    <Button text="Submit" />
                </div>
            </div>
        </div>

    )
}

export default EditAccountPage;