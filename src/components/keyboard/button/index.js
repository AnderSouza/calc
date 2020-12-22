import React from "react";
import styles from "./index.module.css";
import { Icon } from "./icon";

const getProperStyles = (isWide, isTall, isEmpty) => {
  if (isWide) return styles.wideButton;
  if (isTall) return styles.tallButton;
  if (isEmpty) return styles.emptyButton;
  return styles.defaultButton;
};

const Button = ({
  code,
  isWide,
  isTall,
  isEmpty,
  customClass,
  handleButtonPress,
}) => (
  <div
    onClick={() => handleButtonPress(code)}
    className={getProperStyles(isWide, isTall, isEmpty) + " " + customClass}
  >
    <Icon code={code} />
  </div>
);

export default Button;
