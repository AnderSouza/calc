import React from "react";
import styles from "./index.module.css";

const format = (value: string) => (value === "" ? 0 : value);

const getClassName = (showError: boolean) =>
  showError ? `${styles.display} ${styles.error}` : styles.display;

type DisplayProps = {
  formula: string;
  result: string;
  error: string;
  showResult: boolean;
  showError: boolean;
};
export default ({
  formula,
  result,
  error,
  showResult,
  showError,
}: DisplayProps) => (
  <>
    <div className={getClassName(showError)}>
      <div className={styles.topDisplay}>
        {showError ? "Entrada inválida." : format(result)}
      </div>
      <div className={styles.bottomDisplay}>
        {showResult ? format(result) : format(formula)}
      </div>
    </div>
    <hr />
  </>
);
