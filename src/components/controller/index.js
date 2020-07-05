import React, { useState, useEffect } from "react";

import { Display, Keyboard } from "./../index";
import formulaInterpreter from "./formula/formula-interpreter";
import {
  getCurrentNumberFromFormulaText,
  numericStringAlreadyHasAPoint,
  replaceLastCharInString,
  lastCharIsAnOperation,
  lastCharIsANumber,
  lastCharIsAParenthesis,
  lastCharIsAOpeningParenthesis,
  penultimateCharIsAOpeningParenthesis,
} from "./functions";
import { CODE_TYPES, OPERATIONS, NUMBERS, COMMANDS } from "./../../consts";
import CalcException from "../../exceptions/calc-exception";

const Controller = () => {
  const [formulaText, setFormulaText] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    console.log("formulaText", formulaText);
    console.log("ELEMENTS", formulaInterpreter(formulaText).elements);
    const evaluation = "15";
    setResult(evaluation);
  }, [formulaText]);

  const resetFormulaText = () => setFormulaText("");

  const isEmpty = (string) => string.length === 0;

  const handleNumber = (code) => {
    switch (code) {
      case NUMBERS.POINT:
        let currentNumber = getCurrentNumberFromFormulaText(formulaText);
        if (
          isEmpty(formulaText) ||
          numericStringAlreadyHasAPoint(currentNumber)
        ) {
          throw new CalcException("Invalid position for a point.");
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
        const char = NUMBERS.getNumberCharFromCode(code);
        setFormulaText(formulaText + char);
        break;
      default:
        throw new CalcException("Unknown number.");
    }
  };

  const handleOperation = (code) => {
    const char = OPERATIONS.getOperationCharFromCode(code);
    switch (code) {
      case OPERATIONS.MULTIPLICATION:
      case OPERATIONS.DIVISION:
      case OPERATIONS.POTENCY:
        if (
          isEmpty(formulaText) ||
          lastCharIsAOpeningParenthesis(formulaText)
        ) {
          throw new CalcException(
            "Cannot insert this operation in this position."
          );
        }
        if (lastCharIsAnOperation(formulaText)) {
          if (penultimateCharIsAOpeningParenthesis(formulaText)) {
            throw new CalcException(
              "Cannot insert this operation in this position."
            );
          } else {
            let newFormulaText = replaceLastCharInString(formulaText, char);
            setFormulaText(newFormulaText);
          }
        } else {
          setFormulaText(formulaText + char);
        }
        break;

      case OPERATIONS.ADDITION:
      case OPERATIONS.SUBTRACTION:
        if (lastCharIsAnOperation(formulaText)) {
          let newFormulaText = replaceLastCharInString(formulaText, char);
          setFormulaText(newFormulaText);
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
          throw new CalcException(
            "Cannot insert a opening parenthesis at this point."
          );
        }
        setFormulaText(formulaText + char);
        break;
      case OPERATIONS.CLOSING_PARENTHESIS:
        if (
          isEmpty(formulaText) ||
          lastCharIsAnOperation(formulaText) ||
          lastCharIsAOpeningParenthesis(formulaText)
        ) {
          throw new CalcException(
            "Cannot insert a closing parenthesis at this point."
          );
        }
        setFormulaText(formulaText + char);
        break;
      default:
        throw new CalcException("Unknown operation.");
    }
  };

  const handleCommand = (code) => {
    if (isEmpty(formulaText)) {
      throw new CalcException("Formula is empty.");
    } else {
      switch (code) {
        case COMMANDS.CLEAR_ELEMENT:
          const currentNumber = getCurrentNumberFromFormulaText(formulaText);
          const lastPosition = formulaText.length - 1;
          let newFormulaText = formulaText.substr(0, lastPosition - size);
          setFormulaText(newFormulaText);
          break;
        case COMMANDS.CLEAR:
          resetFormulaText();
          break;
        case COMMANDS.RESULT:
          setFormulaText(result);
          break;
        default:
          throw new CalcException("Unknown command.");
      }
    }
  };

  const handleButtonPress = (type, code) => {
    try {
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
          throw new CalcException("Unknown code type. 1");
      }
    } catch (exception) {
      console.error(exception.message);
    }
  };

  return (
    <div>
      {"FormulaText: " + formulaText}
      <br />
      {"Result: " + result}
      <br />
      {"CurrentNumber: " + getCurrentNumberFromFormulaText(formulaText)}
      <br />
      <div>
        <Display
          formula={formulaText}
          result={result}
          currentNumber={getCurrentNumberFromFormulaText(formulaText)}
        />
        <Keyboard handleButtonPress={handleButtonPress} />
      </div>
    </div>
  );
};

export default Controller;
