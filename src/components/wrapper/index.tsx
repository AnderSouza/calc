import React, { ReactChild } from "react";
import styles from "./index.module.css";

export default ({ children }: { children: ReactChild | ReactChild[] }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
