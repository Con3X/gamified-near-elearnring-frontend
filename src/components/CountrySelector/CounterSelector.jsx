import React, { useState, useEffect  } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelector = ({ onChange, style, value }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const options = countryList().getData();

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    onChange(selectedOption);
  };

  useEffect(() => {
    if (value) {
      const defaultCountry = options.find(
        (option) => option.label === value || option.value === value
      );
      setSelectedCountry(defaultCountry);
    }
  }, [value, options]);


  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    ...style,

    option: (base) => ({
      ...base,
      backgroundColor: "White",
      color: "black",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#84858d",
    }),
  };

  return (
    <Select
      styles={customStyles}
      options={options}
      value={selectedCountry}
      onChange={handleChange}
      placeholder="Country"
    />
  );
};

export default CountrySelector;
