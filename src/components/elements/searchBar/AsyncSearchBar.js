import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import axios from "../../../config/axiosConfig";
import { customSearchStyle } from "./customSearchStyle";

const AsyncSearchBar = ({ setCollabs }) => {
  const [query, setQuery] = useState("");

  const animatedComponents = makeAnimated();

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
        components={animatedComponents}
        getOptionLabel={(e) => `${e.name} ${e.surname}`}
        getOptionValue={(e) => e.id}
        loadOptions={getUsers}
        onInputChange={getUsers}
        onChange={(value) => setCollabs(value)}
        styles={customSearchStyle}
      />
    </>
  );
};

export default AsyncSearchBar;
