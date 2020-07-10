import React from "react";
import styles from "./index.module.css";
import Button from "./button";
import { NUMBERS, OPERATIONS, COMMANDS, CODE_TYPES } from "./../../consts";

const Keyboard = ({ handleButtonPress }) => {
  return (
    <div className={styles.keyboard}>
      <Button
        handleButtonPress={handleButtonPress}
        code={COMMANDS.CLEAR}
        type={CODE_TYPES.COMMAND}
        customClass={styles.orange}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={COMMANDS.CLEAR_ELEMENT}
        type={CODE_TYPES.COMMAND}
        customClass={styles.orange}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={OPERATIONS.DIVISION}
        type={CODE_TYPES.OPERATION}
        customClass={styles.blue}
      />

      <Button
        handleButtonPress={handleButtonPress}
        code={OPERATIONS.MULTIPLICATION}
        type={CODE_TYPES.OPERATION}
        customClass={styles.blue}
      />

      <Button
        handleButtonPress={handleButtonPress}
        code={OPERATIONS.OPENING_PARENTHESIS}
        type={CODE_TYPES.OPERATION}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={OPERATIONS.CLOSING_PARENTHESIS}
        type={CODE_TYPES.OPERATION}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={OPERATIONS.POTENCY}
        type={CODE_TYPES.OPERATION}
        customClass={styles.blue}
      />

      <Button
        handleButtonPress={handleButtonPress}
        code={OPERATIONS.SUBTRACTION}
        type={CODE_TYPES.OPERATION}
        customClass={styles.blue}
      />

      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.SEVEN}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.EIGHT}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.NINE}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={OPERATIONS.ADDITION}
        type={CODE_TYPES.OPERATION}
        customClass={styles.blue}
        isTall
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.FOUR}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.FIVE}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.SIX}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />

      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.ONE}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.TWO}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.THREE}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={COMMANDS.RESULT}
        type={CODE_TYPES.COMMAND}
        isTall
        customClass={styles.red}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.ZERO}
        type={CODE_TYPES.NUMBER}
        isWide
        customClass={styles.grey}
      />
      <Button
        handleButtonPress={handleButtonPress}
        code={NUMBERS.POINT}
        type={CODE_TYPES.NUMBER}
        customClass={styles.grey}
      />
    </div>
  );
};

export default Keyboard;
