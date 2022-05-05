import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "../../../config/axiosConfig";
import { customSearchStyle } from "./customSearchStyle";

const AsyncSearchBar = ({ setCollabs }) => {
    const [query, setQuery] = useState("");

    const getUsers = async () => {
        let response;
        await axios
            .get(`/api/users?populate=role,avatar,projects`)
            .then((res) => {
                response = res.data;
            })
            .catch((err) => {
                return err;
            });
        return response;
    };

    return (
        <>
            <AsyncSelect
                cacheOptions
                isMulti
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    ClearIndicator: () => null,
                }}
                getOptionLabel={(e) => `${e.name} ${e.surname}`}
                getOptionValue={(e) => e.id}
                loadOptions={getUsers}
                onInputChange={getUsers}
                onChange={(value) => setCollabs(value)}
                styles={customSearchStyle}
                placeholder="Search Members"
                controlShouldRenderValue={false}
                noOptionsMessage={() => null}
            />
        </>
    );
};

export default AsyncSearchBar;
