import React from "react";
import "./AnswerStyle.css";

export default function Answer({
  id,
  descriptionValue,
  radioChecked,
  handleInputChange,
  handleCheckboxChange,
}) {
  return (
    <div className="content-answer">
      <input
        id={id}
        className="answer"
        type="text"
        name="description"
        placeholder="Enter your choice"
        value={descriptionValue}
        onChange={handleInputChange}
      />
      <div className="answer-right">
        <label>Right answer</label>
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
