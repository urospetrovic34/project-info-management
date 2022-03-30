import React from "react";
import Input from "../../input/Input";
import { Select } from "../../select/Select";
import AdminHeaderCSS from "./AdminHeader.module.css";

export const AdminHeader = () => {
    const arrayOfOptions = [
        { value: "betmen", label: "BATMAN" },
        { value: "riddler", label: "RIDDLER" },
        { value: "catwoman", label: "CATWOMAN" },
        { value: "penguin", label: "PENGUIN" },
        { value: "carmine falcone", label: "CARMINE FALCONE" },
    ];
    return (
        <div className={AdminHeaderCSS.wrapper}>
            <div className={AdminHeaderCSS.container}>
                <div className={AdminHeaderCSS.left_column}>
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search by name..."
                    />
                </div>
                <div className={AdminHeaderCSS.right_column}>
                    <Select options={arrayOfOptions} isMulti={true} />
                    <Select options={arrayOfOptions} />
                </div>
            </div>
        </div>
    );
};
