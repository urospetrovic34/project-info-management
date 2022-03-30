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
    const filterArrayOptions = [
        { value: "Employee", label: "Employee" },
        { value: "Authenticated", label: "Authenticated" },
        { value: "Project Manager", label: "Project Manager" },
        { value: "System Administrator", label: "System Administrator" },
    ];
    const sortArrayOptions = [
        { value: "", label: "Name - Ascending" },
        { value: "", label: "Name - Descending" },
        { value: "", label: "Projects - High to Low" },
        { value: "", label: "Projects - Low to High" },
    ];
    return (
        <div className={AdminHeaderCSS.wrapper}>
            <div className={AdminHeaderCSS.container}>
                <div className={AdminHeaderCSS.left_column}>
                    <Input type="text" name="search" placeholder="Search..." />
                </div>
                <div className={AdminHeaderCSS.right_column}>
                    <Select
                        placeholder="Filter by role"
                        options={filterArrayOptions}
                        multi={true}
                    />
                    <Select
                        placeholder="Sort by..."
                        options={sortArrayOptions}
                        multi={false}
                        // defaultValue={arrayOfOptions[0]}
                    />
                </div>
            </div>
        </div>
    );
};
