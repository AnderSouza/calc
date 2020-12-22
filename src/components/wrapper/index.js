import React from "react";
import styles from "./index.module.css";

export default Wrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
