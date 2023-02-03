import React from "react";

const Select = ({ label, value, options, onChange }) => {
  return (
    <div className="select_container">
      {label}
      <select className="select" value={value} onChange={onChange}>
        {options?.map((option, i) => {
          return (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
