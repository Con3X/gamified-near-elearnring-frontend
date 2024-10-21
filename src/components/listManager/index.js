export const moveUp = async (index, data, setData, onChange, handleSubmit) => {
  if (index === 0) return;
  const newData = [...data];
  [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
  reassignNumbers(newData, setData, onChange);
  
  await handleSubmit(newData);
};

export const moveDown = async (index, data, setData, onChange, handleSubmit) => {
  if (index === data.length - 1) return;
  const newData = [...data];
  [newData[index + 1], newData[index]] = [newData[index], newData[index + 1]];
  reassignNumbers(newData, setData, onChange);
  
  await handleSubmit(newData);
};

const reassignNumbers = (newData, setData, onChange) => {
  const updatedData = newData.map((item, i) => ({
    ...item,
    number: i + 1, 
  }));
  setData(updatedData);
  onChange(updatedData);
};



