import React from "react";
import styles from "./index.module.css";
import Button from "./button";
import { ButtonTypes } from "../../consts";
import { ORDERED_BUTTONS } from "./ordered-buttons";

const getClass = (type: number) => {
  switch (type) {
    case ButtonTypes.NUMBER:
      return styles.grey;
    case ButtonTypes.OPERATION:
      return styles.blue;
    case ButtonTypes.COMMAND:
      return styles.orange;
    default:
      return styles.grey;
  }
};

export default ({
  handleButtonPress,
}: {
  handleButtonPress: (code: number) => void;
}) => {
  return (
    <div className={styles.keyboard}>
      {ORDERED_BUTTONS.map((button, index) => (
        <Button
          key={index}
          handleButtonPress={handleButtonPress}
          code={button.code}
          isTall={!!button.isTall}
          isWide={!!button.isWide}
          customClass={getClass(button.type)}
        ></Button>
      ))}
    </div>
  );
};
