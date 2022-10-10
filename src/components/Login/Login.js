import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "User_Input") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "Input_Blur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const pwdReducer = (state, action) => {
  if (action.type === "User_Input") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "Input_Blur") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, dispatchEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setp] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollegeName, setCollegeName] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(pwdReducer, {
    value: "",
    isValid: null,
  });

  // useEffect(() => {
  //   const doValidation = setTimeout(() => {
  //     console.log("checking form validity");
  //     setFormIsValid(
  //       enteredCollegeName.trim().length > 0 &&
  //         p.trim().length > 6 &&
  //         emailState.isValid
  //     );
  //   }, 50);

  //   return () => {
  //     console.log("clear timmer");
  //     clearTimeout(doValidation);
  //   };
  // }, []);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "User_Input", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        enteredCollegeName.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "User_Input", val: event.target.value });
    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 6 &&
        enteredCollegeName.trim().length > 0
    );
  };
  const collegeNameChangeHandler = (event) => {
    setCollegeName(event.target.value);

    setFormIsValid(
      emailState.isValid &&
        passwordState.isValid &&
        event.target.value.trim().length > 0
    );
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type: "Input_Blur" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "Input_Blur" });
  };
  const validateCollegeNameHandler = function (event) {
    if (event.target.value.trim().length > 0) {
      setCollegeIsValid(enteredCollegeName.trim().length > 0);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="clg">College-Name</label>
          <input
            type="text"
            id="clg"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
