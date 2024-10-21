export const handleSubmit = (e, formInput) => {
  e.preventDefault();
  console.log(formInput);
};

export const handleInputChange = (e, setFormInput) => {
  const { name, value } = e.target;
  setFormInput((prevInput) => ({
    ...prevInput,
    [name]: value,
  }));
};

export const handleOnChangeDescription = (value, setFormInput) => {
  setFormInput((prevInput) => ({
    ...prevInput,
    description: value,
  }));
};
