import React from "react";
import styles from "./index.module.css";
import Button from "./button";
import { BUTTON_TYPES } from "./../../consts";
import { ORDERED_BUTTONS } from "./ordered-buttons";

const getClass = (type) => {
  switch (type) {
    case BUTTON_TYPES.NUMBER:
      return styles.grey;
    case BUTTON_TYPES.OPERATION:
      return styles.blue;
    case BUTTON_TYPES.COMMAND:
      return styles.orange;
    default:
      return styles.grey;
  }
};

export default Keyboard = ({ handleButtonPress }) => {
  return (
    <div className={styles.keyboard}>
      {ORDERED_BUTTONS.map((button, index) => (
        <Button
          key={index}
          handleButtonPress={handleButtonPress}
          code={button.code}
          isTall={button.isTall}
          isWide={button.isWide}
          isEmpty={button.isEmpty}
          customClass={getClass(button.type)}
        ></Button>
      ))}
    </div>
  );
};
