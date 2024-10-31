import React from "react";
import AnswerComponent from "components/answer/Answer";
import { handleInputChange, handleCheckboxChange } from "./index";

export default function Answer({ data, setFormInput }) {
  if (data.length === 0) {
    for (let i = 1; i <= 4; i++) {
      data.push({
        id: i,
        description: "",
        is_correct: false,
      });
    }
  }

  return data?.map((item) => (
    <div key={item.id}>
      <AnswerComponent
        id={item.id}
        descriptionValue={item.description}
        radioChecked={item.is_correct}
        handleInputChange={(e) => handleInputChange(e, item.id, setFormInput)}
        handleCheckboxChange={(e) =>
          handleCheckboxChange(e, item.id, setFormInput)
        }
      />
    </div>
  ));
}
