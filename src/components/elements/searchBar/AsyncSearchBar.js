import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "../../../config/axiosConfig";
import { customSearchStyle } from "./customSearchStyle";

const AsyncSearchBar = (props) => {
    const getUsers = async (value) => {
        let response;
        await axios
            .get(
                `/api/users?${
                    value ? `filters[$or][0][name][$containsi]=${value}&filters[$or][1][surname][$containsi]=${value}` : null
                }&filters[role][name][$eq]=Employee&populate=role,avatar,projects`
            )
            .then((res) => {
                response = res.data.data;
            })
            .catch((err) => {
                return err;
            });
        return response;
    };

    return (
        <>
            <AsyncSelect
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    ClearIndicator: () => null,
                }}
                getOptionLabel={(e) => `${e.name} ${e.surname}`}
                getOptionValue={(e) => e.id}
                loadOptions={(value) => getUsers(value)}
                onInputChange={(value) => getUsers(value)}
                onChange={(value) => props.onChange(value)}
                styles={customSearchStyle}
                placeholder="Search Members"
                controlShouldRenderValue={false}
                noOptionsMessage={() => null}
            />
        </>
    );
};

export default AsyncSearchBar;
