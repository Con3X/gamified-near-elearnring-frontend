export const courseDifficultyList = [
  { value: "Beginner", label: "1. Newbie (Beginner)" },
  { value: "Normal", label: "2. Learner (Normal)" },
  { value: "Advanced", label: "3. Pro (Advanced)" },
  { value: "Legend", label: "4. Legend" },
  { value: "Master", label: "5. Master" },
  { value: "Hacker", label: "6. Hacker" },
];

export const options = [
  { value: "Chinese", label: "Chinese" },
  { value: "Spanish", label: "Spanish" },
  { value: "English", label: "English" },
  { value: "Arabic", label: "Arabic" },
  { value: "Hindi", label: "Hindi" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Bengali", label: "Bengali" },
  { value: "Russian", label: "Russian" },
  { value: "Japanese", label: "Japanese" },
  { value: "Lahnda", label: "Lahnda" },
  { value: "Another", label: "Another" },
];

export const customStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),

  option: (base) => ({
    ...base,
    backgroundColor: "white",
    color: "black !important",
    width: "90%",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#bbbbc1",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#bbbbc1",
  }),
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    width: "90%",
    border: "2px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "10px",
  }),
};
