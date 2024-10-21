import React, { useState } from "react";
import InputFile from "./inputFile/InputFile.jsx";
import ImageCrop from "./cropper/Cropper.jsx";

export default function CropImage({ fileInputRef, onCropComplete }) {
  const [image, setImage] = useState("");
  const [currPage, setCurrPage] = useState("");

  const onCropDone = (imgCroppedAres) => {
    const canvElement = document.createElement("canvas");
    canvElement.width = imgCroppedAres.width;
    canvElement.height = imgCroppedAres.height;
    const context = canvElement.getContext("2d");
    let img = new Image();
    img.src = image;
    img.onload = function () {
      context.drawImage(
        img,
        imgCroppedAres.x,
        imgCroppedAres.y,
        imgCroppedAres.width,
        imgCroppedAres.height,
        0,
        0,
        imgCroppedAres.width,
        imgCroppedAres.height
      );
      const dataUrl = canvElement.toDataURL("image/jpeg");
      onCropComplete(dataUrl);
      setCurrPage("");
    };
  };
  const onCropCancel = () => {
    setCurrPage("");
    setImage("");
  };

  const onImageSelected = (selectImg) => {
    setImage(selectImg);
    setCurrPage("crop-img");
  };

  return (
    <div>
      <InputFile
        onImageSelected={onImageSelected}
        fileInputRef={fileInputRef}
      />
      {currPage === "crop-img" ? (
        <div className="cropper">
          <ImageCrop
            image={image}
            onCropDone={onCropDone}
            onCropCancel={onCropCancel}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
