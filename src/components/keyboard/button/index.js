import React from "react";
import styles from "./index.module.css";
import { CODE_TYPES, COMMANDS, NUMBERS, OPERATIONS } from "./../../../consts";

const getChar = (type, code) => {
  switch(type) {
    case CODE_TYPES.COMMAND:
      return COMMANDS.getCommandCharFromCode(code);
    case CODE_TYPES.OPERATION:
      return OPERATIONS.getOperationCharFromCode(code);
    case CODE_TYPES.NUMBER:
      return NUMBERS.getNumberCharFromCode(code);
    default:
      return "";
  }
};

const getProperStyles = (isWide, isTall, isEmpty) => {
  if (isWide) return styles.wideButton;
  if (isTall) return styles.tallButton;
  if (isEmpty) return styles.emptyButton;
  return styles.defaultButton;
};

const Button = ({ code, type, isWide, isTall, isEmpty, customClass, handleButtonPress }) => (
  <div
    onClick={() => handleButtonPress(type, code)}
    className={getProperStyles(isWide, isTall, isEmpty)+" "+customClass}
  >
    {getChar(type, code)}
  </div>
);

export default Button;
