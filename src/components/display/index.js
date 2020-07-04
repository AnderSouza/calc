import React from "react";
import styles from "./index.module.css";
const Display = ({formula, result}) => {
    return <div className={styles.display}>
        <div className={styles.topDisplay}>{result}</div>
        <div className={styles.bottomDisplay}>{formula}</div>
    </div>;
};

export default Display;