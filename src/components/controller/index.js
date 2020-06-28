import React, { useState, useEffect } from "react";

import { Display, Keyboard } from "../index";
import formulaInterpreter from "./formula/formula-interpreter";

import { CODE_TYPES, OPERATIONS, NUMBERS, COMMANDS } from "../../consts";

const Controller = () => {
  const [formulaText, setFormulaText] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const evaluation = formulaInterpreter(formulaText).evaluate();
    setResult(evaluation);
  }, formulaText);

  const charIsANumber = (char) => {
    switch (char) {
      case NUMBERS.ZERO_CHAR:
      case NUMBERS.ONE_CHAR:
      case NUMBERS.TWO_CHAR:
      case NUMBERS.THREE_CHAR:
      case NUMBERS.FOUR_CHAR:
      case NUMBERS.FIVE_CHAR:
      case NUMBERS.SIX_CHAR:
      case NUMBERS.SEVEN_CHAR:
      case NUMBERS.EIGHT_CHAR:
      case NUMBERS.NINE_CHAR:
        return true;
      default:
        return false;
    }
  };

  const charIsAnOperation = (char) => {
    switch (char) {
      case OPERATIONS.ADDITION_CHAR:
      case OPERATIONS.SUBTRACTION_CHAR:
      case OPERATIONS.MULTIPLICATION_CHAR:
      case OPERATIONS.DIVISION_CHAR:
      case OPERATIONS.POTENCY_CHAR:
        return true;
      default:
        return false;
    }
  };

  const charIsAParenthesis = (char) => {
    switch (char) {
      case OPERATIONS.OPENING_PARENTHESIS_CHAR:
      case OPERATIONS.CLOSING_PARENTHESIS_CHAR:
        return true;
      default:
        return false;
    }
  };

  const charIsAParenthesis = (char) => {
    switch (char) {
      case OPERATIONS.OPENING_PARENTHESIS_CHAR:
      case OPERATIONS.CLOSING_PARENTHESIS_CHAR:
        return true;
      default:
        return false;
    }
  };

  const charIsAPoint = (char) => char === NUMBERS.POINT_CHAR;

  const getCurrentNumberFromFormulaText = (formulaText) => {
    let currentNumber = "";
    for (let i = formulaText.length - 1; i >= 0; i--) {
      const char = formulaText.charAt(i);
      if (charIsANumber(char) || charIsAPoint(char)) {
        currentNumber += char;
      } else {
        return currentNumber;
      }
    }
  };

  const currentNumberAlreadyHasAPoint = (formulaText) =>
    getCurrentNumberFromFormulaText(formulaText).search(NUMBERS.POINT) !== -1;

  const removeCurrentNumberFromFormulaText = () => {
    const size = getCurrentNumberFromFormulaText(formulaText).length;
    const lastPosition = formulaText.length - 1;

    let newString = formulaText.substr(0, lastPosition - size);
    setFormulaText(newString);
  };

  const resetFormulaText = () => setFormulaText("");

  const isEmpty = (string) => string.length === 0;

  const getLastChar = (string) => {
    if (string.length === 0) return "";
    const lastPosition = string.length - 1;
    return string.charAt(lastPosition);
  };

  const lastCharIsAnOperation = (string) => {
    const char = getLastChar(string);
    return charIsAnOperation(char);
  };

  const lastCharIsANumber = (string) => {
    const char = getLastChar(string);
    return charIsANumber(char);
  };
  const lastCharIsAParenthesis = (string) => {
    const char = getLastChar(string);
    return charIsAParenthesis(char);
  };

  const replaceLastCharInFormula = (replacement) => {
    const lastPosition = formulaText.length - 1;
    let newString = formulaText.substr(0, lastPosition - 1);
    newString += replacement;
    setFormulaText(newString);
  };

  const handleNumber = (code) => {
    switch (code) {
      case NUMBERS.POINT:
        if (isEmpty(formulaText) || currentNumberAlreadyHasAPoint(formulaText)) {
          // This should throw an exception.
          return;
        }
      case NUMBERS.ZERO:
      case NUMBERS.ONE:
      case NUMBERS.TWO:
      case NUMBERS.THREE:
      case NUMBERS.FOUR:
      case NUMBERS.FIVE:
      case NUMBERS.SIX:
      case NUMBERS.SEVEN:
      case NUMBERS.EIGHT:
      case NUMBERS.NINE:
        const char = OPERATIONS.getOperationCharFromCode(code);
        setFormulaText(formulaText + char);
        break;
      default:
        // This should throw an exception
        break;
    }
  };

  const handleOperation = (code) => {
    const char = OPERATIONS.getOperationCharFromCode(code);
    switch (code) {
      case OPERATIONS.MULTIPLICATION:
      case OPERATIONS.DIVISION:
      case OPERATIONS.POTENCY:
        if (isEmpty(formulaText)) {
          // This should throw an exception
          return;
        }

      case OPERATIONS.ADDITION:
      case OPERATIONS.SUBTRACTION:
        if (lastCharIsAnOperation(formulaText)) {
          replaceLastCharInFormula(char);
        } else {
          setFormulaText(formulaText + char);
        }
        break;
      case OPERATIONS.OPENING_PARENTHESIS:
        if (
          isEmpty(formulaText) ||
          lastCharIsANumber(formulaText) ||
          lastCharIsAParenthesis(formulaText)
        ) {
          // This should throw an exception
          return;
        }
        setFormulaText(formulaText + char);
        break;
      case OPERATIONS.CLOSING_PARENTHESIS:
        if (
          isEmpty(formulaText) ||
          lastCharIsAnOperation(formulaText) ||
          lastCharIsAParenthesis(formulaText)
        ) {
          return;
        }
        setFormulaText(formulaText + char);
        break;
      default:
        // This should throw an exception
        break;
    }
  };

  const handleCommand = (code) => {
    if (isEmpty(formulaText)) {
      // This should throw an exception
      return;
    } else {
      switch (code) {
        case COMMANDS.CLEAR_ELEMENT:
          removeCurrentNumberFromFormulaText();
          break;
        case COMMANDS.CLEAR:
          resetFormulaText();
          break;
        case COMMANDS.RESULT:
          setFormulaText(result);
          break;
        default:
          // This should throw an exception
          break;
      }
    }
  };

  const handleButtonPress = (type, code) => {
    switch (type) {
      case CODE_TYPES.NUMBER:
        handleNumber(code);
        break;
      case CODE_TYPES.OPERATION:
        handleOperation(code);
        break;
      case CODE_TYPES.COMMAND:
        handleCommand(code);
        break;
      default:
        // This should throw and exception
        break;
    }
  };

  return (
    <div>
      <Display formula={formulaText} result={result} />
      <Keyboard handleButtonPress={handleButtonPress} />
    </div>
  );
};

export default Controller;
