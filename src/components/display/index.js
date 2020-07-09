import React from "react";
import styles from "./index.module.css";

const format = (value) => {
  return value === "" ? 0 : value;
};

const Display = ({ formula, result, currentNumber, showResult }) => {
  return (
    <div className={styles.display}>
      <div className={styles.topDisplay}>
        {showResult ? format(result) : format(currentNumber)}
      </div>
      <div className={styles.bottomDisplay}>
        {showResult ? format(result) : format(formula)}
      </div>
    </div>
  );
};

export default Display;
