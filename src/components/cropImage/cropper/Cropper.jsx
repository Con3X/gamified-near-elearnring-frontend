import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Button from "components/button";
import "../cropper/CropperStyle.css";

export default function ImageCrop({ image, onCropDone, onCropCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className="popup-overlay">
      <div className="cropper-wrapper">
        <Cropper
          image={image}
          aspect={1 / 1}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
        <div className="btn-image">
          <Button
            variant="white"
            cust
            className="banner-btn"
            onClick={onCropCancel}
          >
            Cancel
          </Button>
          <div>
            <Button
              variant="blue"
              cust
              className="banner-btn"
              onClick={() => onCropDone(croppedArea)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
