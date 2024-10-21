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

export const handelQAList = (data, setFormInput) => {
  setFormInput((prevInput) => ({
    ...prevInput,
    qaList: data,
  }));
};

export const handelAddQA = (e, setFormInput) => {
  setFormInput((prevInput) => ({
    ...prevInput,
    qaList: [
      ...prevInput.qaList,
      {
        id: prevInput.qaList.length + 1,
        number: prevInput.qaList.length + 1,
        type: e.target.value,
      },
    ],
  }));
};

export const handleOnChangeDescription = (value, setFormInput) => {
  setFormInput((prevInput) => ({
    ...prevInput,
    description: value,
  }));
};