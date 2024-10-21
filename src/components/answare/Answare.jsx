import React from "react";
import "./AnswareStyle.css";

export default function Answare({
  id,
  descriptionValue,
  radioChecked,
  handleInputChange,
  handleCheckboxChange,
}) {
  return (
    <div className="d-flex">
      <input
        id={id}
        className="answare"
        type="text"
        name="description"
        placeholder="Enter your choise"
        value={descriptionValue}
        onChange={handleInputChange}
      />
      <div className="answare-right">
        <label>Right answare</label>
        <input
          id={id}
          type="checkbox"
          name="isCorrect"
          checked={radioChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}
