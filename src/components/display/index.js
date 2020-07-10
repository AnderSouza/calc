import React from "react";
import styles from "./index.module.css";

const format = (value) => {
  return value === "" ? 0 : value;
};

const getClassName = (showError) =>
  showError ? `${styles.display} ${styles.error}` : styles.display;

const Display = ({ result, formula, error, showResult, showError }) => {
  return (
    <div className={getClassName(showError)}>
      <div className={styles.topDisplay}>
        {showError ? "Entrada inválida." : format(result)}
      </div>
      <div className={styles.bottomDisplay}>
        {showResult ? format(result) : format(formula)}
      </div>
    </div>
  );
};

export default Display;
