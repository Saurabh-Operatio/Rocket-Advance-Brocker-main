import React from "react";
import "./InputCustom.scss";
const InputCustom = ({ type, label, placeholder, onChange, value }) => {
  return (
    <div className="customInput">
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputCustom;
