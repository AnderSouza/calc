import React, { useState, useEffect } from "react";

import { Display, Keyboard } from "../index";
import formulaInterpreter from "./formula-interpreter";
import ELEMENT_TYPES from "../../const/element-types";
import OPERATIONS from "../../const/operations";
import NUMBER_KEYS from "../../const/number-keys";

const Controller = () => {
  const [formulaText, setFormulaText] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const evaluation = formulaInterpreter(formulaText).evaluate();
    setResult(evaluation);
  }, formulaText);

  const characterIsANumber = (char) => {
    switch (char) {
      case NUMBER_KEYS.ZERO:
      case NUMBER_KEYS.ONE:
      case NUMBER_KEYS.TWO:
      case NUMBER_KEYS.THREE:
      case NUMBER_KEYS.FOUR:
      case NUMBER_KEYS.FIVE:
      case NUMBER_KEYS.SIX:
      case NUMBER_KEYS.SEVEN:
      case NUMBER_KEYS.EIGHT:
      case NUMBER_KEYS.NINE:
      case NUMBER_KEYS.TEN:
        return true;
      default:
        return false;
    }
  };

  const characterIsAnOperation = (char) => {
    switch (char) {
      case OPERATIONS.ADDITION:
      case OPERATIONS.SUBTRACTION:
      case OPERATIONS.MULTIPLICATION:
      case OPERATIONS.DIVISION:
      case OPERATIONS.POTENCY:
        return true;
      default:
        return false;
    }
  };

  const characterIsAParenthesis = (char) => {
    switch (char) {
      case OPERATIONS.OPENING_PARENTHESIS:
      case OPERATIONS.CLOSING_PARENTHESIS:
        return true;
      default:
        return false;
    }
  };

  const characterIsAPoint = (char) => char === NUMBER_KEYS.POINT;

  const getCurrentNumberFromFormulaText = (formulaText) => {
    let currentNumber = "";
    for (let i = formulaText.length - 1; i >= 0; i--) {
      const char = formulaText.charAt(i);
      if (characterIsANumber(char) || characterIsAPoint(char)) {
        currentNumber += char;
      } else {
        return currentNumber;
      }
    }
  };

  const currentNumberAlreadyHasAPointSeparator = (formulaText) =>
    getCurrentNumberFromFormulaText(formulaText).search(NUMBER_KEYS.POINT) !==
    -1;

  const removeCurrentNumberFromFormulaText = () => {
    const size = getCurrentNumberFromFormulaText(formulaText).length;
    const lastPosition = formulaText.length - 1;

    let newString = formulaText.substr(0, lastPosition - size);
    setFormulaText(newString);
  };

  const resetFormulaText = () => setFormulaText("");

  const isEmpty = (string) => string.length === 0;

  const getLastCharacter = (string) => {
    const lastPosition = string.length - 1;
    return string.charAt(lastPosition);
  };

  const lastCharacterIsAnOperation = (string) => {
    const char = getLastCharacter(string);
    return characterIsAnOperation(char);
  };

  const lastCharacterIsANumber = (string) => {
    const char = getLastCharacter(string);
    return characterIsANumber(char);
  };
  const lastCharacterIsAParenthesis = (string) => {
    const char = getLastCharacter(string);
    return characterIsAParenthesis(char);
  };

  const replaceLastCharacterInFormula = (replacement) => {
    const lastPosition = formulaText.length - 1;
    let newString = formulaText.substr(0, lastPosition - 1);
    newString += replacement;
    setFormulaText(newString);
  };

  const handleNumber = (char) => {
    switch (char) {
      case NUMBER_KEYS.POINT:
        if (
          isEmpty(formulaText) ||
          currentNumberAlreadyHasAPointSeparator(formulaText)
        )
          return;
      case NUMBER_KEYS.ZERO:
      case NUMBER_KEYS.ONE:
      case NUMBER_KEYS.TWO:
      case NUMBER_KEYS.THREE:
      case NUMBER_KEYS.FOUR:
      case NUMBER_KEYS.FIVE:
      case NUMBER_KEYS.SIX:
      case NUMBER_KEYS.SEVEN:
      case NUMBER_KEYS.EIGHT:
      case NUMBER_KEYS.NINE:
      case NUMBER_KEYS.TEN:
        setFormulaText(formulaText + char);
        break;
      default:
        break;
    }
  };

  const handleOperation = (char) => {
    if (isEmpty(formulaText)) {
      return;
    } else {
      switch (char) {
        case OPERATIONS.ADDITION:
        case OPERATIONS.SUBTRACTION:
        case OPERATIONS.MULTIPLICATION:
        case OPERATIONS.DIVISION:
        case OPERATIONS.POTENCY:
          if (lastCharacterIsAnOperation(formulaText)) {
            replaceLastCharacterInFormula(char);
          } else {
            setFormulaText(formulaText + char);
          }
          break;
        case OPERATIONS.OPENING_PARENTHESIS:
          if (lastCharacterIsANumber(formulaText) || lastCharacterIsAParenthesis(formulaText)) {
            return;
          } else {
            setFormulaText(formulaText + char);
          }
          break;
        case OPERATIONS.CLOSING_PARENTHESIS:
          if (lastCharacterIsAnOperation(formulaText) || lastCharacterIsAParenthesis(formulaText)) {
            return;
          } else {
            setFormulaText(formulaText + char);
          }
          break;
        case OPERATIONS.CLEAR_ELEMENT:
          removeCurrentNumberFromFormulaText();
          break;
        case OPERATIONS.CLEAR:
          resetFormulaText();
          break;
        case OPERATIONS.RESULT:
          setFormulaText(result);
          break;
        default:
          break;
      }
    }
  };

  const handleButtonPress = (type, key) => {
    switch (type) {
      case ELEMENT_TYPES.NUMBER:
        handleNumber(key);
        break;
      case ELEMENT_TYPES.OPERATION:
        handleOperation(key);
        break;
      default:
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
