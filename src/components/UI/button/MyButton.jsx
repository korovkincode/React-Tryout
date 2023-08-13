import React from "react";
import classes from "./MyButton.module.css";

const MyButton = ({children, ...props}) => {
    let allClasses = classes.myBtn;
    if (props.btnBorder) allClasses += " " + classes[props.btnBorder];
    return (
        <button {...props} className={allClasses}>
            {children}
        </button>
    )
}

export default MyButton;