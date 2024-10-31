export const handleInputChange = (e, id, setFormInput) => {
  const { value } = e.target;

  setFormInput((prevInput) => ({
    ...prevInput,
    options: prevInput.options.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          description: value,
          is_correct: value.trim() !== "" ? item.is_correct : false,
        };
      }
      return item;
    }),
  }));
};
export const handleCheckboxChange = (e, id, setFormInput) => {
  const { checked } = e.target;

  setFormInput((prevInput) => {
    const updatedOptions = prevInput.options.map((item) => {
      if (item.id === id) {
        if (item.description.trim() === "") {
          return { ...item, is_correct: false };
        }
        return { ...item, is_correct: checked };
      }
      return item;
    });

    return {
      ...prevInput,
      options: updatedOptions,
    };
  });
};
