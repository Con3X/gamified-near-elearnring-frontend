import React from "react";
export default function InputFile({ onImageSelected, fileInputRef }) {
  const handlingOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function () {
        onImageSelected(reader.result);
      };
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handlingOnChange}
      />
    </div>
  );
}
