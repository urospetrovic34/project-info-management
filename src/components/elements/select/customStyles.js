export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "45px",
    height: "45px",
    border: "none",
    boxShadow: "none",
    borderRadius: "2px",
    cursor: "pointer",
    marginTop: "5px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0px",
    marginLeft: "5px",
    marginTop: "-5px",
  }),
  input: (provided, state) => ({
    ...provided,
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "45px",
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
    backgroundColor: isFocused ? "#001628" : "white",
    color: isFocused ? "#99D9D9" : "#001628",
  }),
  menu: (provided, state) => ({
    ...provided,
    padding: "0px",
    marginTop: "0px",
    maxHeight: "225px",
    overflow: "hidden",
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: "0px",
    borderRadius: "2px",
    maxHeight: "225px",
    overflow: "hidden",
  }),
};
