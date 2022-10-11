import React from "react";

import classes from "./Login.module.css";

const Nlogin = (props) => {
  return (
    <div>
      <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type={props.type}
          id={props.email}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    </div>
  );
};

export default Nlogin;
