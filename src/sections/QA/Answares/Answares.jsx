import React from "react";
import Answare from "components/answare/Answare";
import { handleInputChange, handleCheckboxChange } from "./index";

export default function Answares({ data, setFormInput }) {
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
      <Answare
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
