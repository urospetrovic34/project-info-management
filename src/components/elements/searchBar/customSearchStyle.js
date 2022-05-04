export const customSearchStyle = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
    focus: "none",
    border: "1px solid lightgray",
    marginBottom: "25px",
    width: "80%",
    "@media only screen and (max-width: 635px)": {
      ...provided["@media only screen and (max-width: 635px)"],
      width: "100%",
    },
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0px",
  }),
  input: (provided, state) => ({
    ...provided,
    outline: "none",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "35px",
  }),
  dropdownIndicator: () => ({
    color: "#001628",
    marginRight: "7px",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    cursor: "pointer",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "7px",
    backgroundColor: isFocused ? "lightgray" : "white",
    color: isFocused ? "black" : "#001628",
  }),
  menu: (provided, state) => ({
    ...provided,
    padding: "0px",
    marginTop: "0px",
    overflow: "hidden",
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: "0px",
    borderRadius: "2px",
    overflow: "hidden",
  }),
};
