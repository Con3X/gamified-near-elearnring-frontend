export const handleInputChange = (e, id, setFormInput) => {
  const { value } = e.target;
  setFormInput((prevInput) => ({
    ...prevInput,
    options: prevInput.options.map((item) =>
      item.id === id ? { ...item, description: value } : item
    ),
  }));
};

export const handleCheckboxChange = (e, id, setFormInput) => {
  const { checked } = e.target;
  setFormInput((prevInput) => ({
    ...prevInput,
    options: prevInput.options.map((item) =>
      item.id === id ? { ...item, is_correct: checked } : item
    ),
  }));
};
