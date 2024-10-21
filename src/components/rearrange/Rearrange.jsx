import React from "react";
import "./RearrangeStyle.css";

const Rearrange = ({ onClickDown, onClickUp }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button className="button-style" type="button" onClick={onClickUp}>
        <div className="up-arrow-style"></div>
      </button>
      <button className="button-style" type="button" onClick={onClickDown}>
        <div className="down-arrow-style"></div>
      </button>
    </div>
  );
};

export default Rearrange;
