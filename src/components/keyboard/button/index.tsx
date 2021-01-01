import React from "react";
import styles from "./index.module.css";
import { Icon } from "./icon";

const getProperStyles = (isWide: boolean, isTall: boolean) => {
  if (isWide) return styles.wideButton;
  if (isTall) return styles.tallButton;
  return styles.defaultButton;
};

const Button = ({
  code,
  isWide,
  isTall,
  customClass,
  handleButtonPress,
}: {
  code: number;
  isWide: boolean;
  isTall: boolean;
  customClass: string;
  handleButtonPress: any;
}) => (
  <div
    onClick={() => handleButtonPress(code)}
    className={getProperStyles(isWide, isTall) + " " + customClass}
  >
    <Icon code={code} />
  </div>
);

export default Button;
