import { OPERATIONS, NUMBERS, COMMANDS } from "./../../consts";
import { CalcException } from "../../exceptions";

export const charIsANumber = (char) => {
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

export const charIsAnOperation = (char) => {
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

export const charIsAOpeningParenthesis = (char) =>
  char === OPERATIONS.OPENING_PARENTHESIS_CHAR;

export const charIsAClosingParenthesis = (char) =>
  char === OPERATIONS.CLOSING_PARENTHESIS_CHAR;

export const charIsAPoint = (char) => char === NUMBERS.POINT_CHAR;

export const charIsAParenthesis = (char) =>
  charIsAOpeningParenthesis(char) || charIsAClosingParenthesis(char);

export const getCurrentNumberFromFormulaText = (formulaText) => {
  let currentNumber = "";
  for (let i = formulaText.length - 1; i >= 0; i--) {
    const char = formulaText.charAt(i);
    if (charIsANumber(char) || charIsAPoint(char)) {
      currentNumber = char + currentNumber;
    } else {
      return currentNumber;
    }
  }
  return currentNumber;
};

export const numericStringAlreadyHasAPoint = (number) => {
  for (let i = 0; i < number.length; i++) {
    if (number.charAt(i) === NUMBERS.POINT_CHAR) return true;
  }
  return false;
};

export const replaceLastCharInString = (string, replacement) => {
  const newNumberOfCharacters = string.length - 1;
  string = string.substr(0, newNumberOfCharacters);
  string += replacement;
  return string;
};

export const thereAreUnclosedParenthesis = (formulaText) => {
  let numberOfOpeningParenthesis = 0;
  let numberOfClosingParenthesis = 0;

  for (let i = 0; i < formulaText.length; i++) {
    if (formulaText.charAt(i) === OPERATIONS.OPENING_PARENTHESIS_CHAR) {
      numberOfOpeningParenthesis++;
    }
    if (formulaText.charAt(i) === OPERATIONS.CLOSING_PARENTHESIS_CHAR) {
      numberOfClosingParenthesis++;
    }
  }
  return numberOfOpeningParenthesis > numberOfClosingParenthesis;
};

export const getLastChar = (string) => {
  if (string.length === 0) return "";
  const lastPosition = string.length - 1;
  return string.charAt(lastPosition);
};

export const getPenultimateChar = (string) => {
  if (string.length < 2) return "";
  const penultimatePosition = string.length - 2;
  return string.charAt(penultimatePosition);
};

export const lastCharIsAnOperation = (string) => {
  const char = getLastChar(string);
  return charIsAnOperation(char);
};

export const lastCharIsANumber = (string) => {
  const char = getLastChar(string);
  return charIsANumber(char);
};

export const lastCharIsAParenthesis = (string) => {
  const char = getLastChar(string);
  return charIsAParenthesis(char);
};

export const lastCharIsAOpeningParenthesis = (string) => {
  const char = getLastChar(string);
  return charIsAOpeningParenthesis(char);
};

export const penultimateCharIsAOpeningParenthesis = (string) => {
  const char = getPenultimateChar(string);
  return charIsAOpeningParenthesis(char);
};

export const isEmpty = (string) => string.length === 0;

export const handleNumberCode = (code, formulaText) => {
  switch (code) {
    case NUMBERS.POINT:
      let currentNumber = getCurrentNumberFromFormulaText(formulaText);
      if (
        isEmpty(formulaText) ||
        isEmpty(currentNumber) || 
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
      return formulaText + char;
    default:
      throw new CalcException("Unknown number code: " + code);
  }
};

export const handleOperationCode = (code, formulaText) => {
  const char = OPERATIONS.getOperationCharFromCode(code);
  switch (code) {
    case OPERATIONS.MULTIPLICATION:
    case OPERATIONS.DIVISION:
    case OPERATIONS.POTENCY:
      if (isEmpty(formulaText) || lastCharIsAOpeningParenthesis(formulaText)) {
        throw new CalcException(
          "Cannot insert this operation at this position."
        );
      }
      if (lastCharIsAnOperation(formulaText)) {
        if (penultimateCharIsAOpeningParenthesis(formulaText)) {
          throw new CalcException(
            "Cannot insert this operation at this position."
          );
        } else {
          formulaText = replaceLastCharInString(formulaText, char);
          return formulaText;
        }
      } else {
        return formulaText + char;
      }
    case OPERATIONS.ADDITION:
    case OPERATIONS.SUBTRACTION:
      if (lastCharIsAnOperation(formulaText)) {
        formulaText = replaceLastCharInString(formulaText, char);
        return formulaText;
      } else {
        return formulaText + char;
      }
    case OPERATIONS.OPENING_PARENTHESIS:
      if (
        isEmpty(formulaText) ||
        lastCharIsANumber(formulaText) ||
        lastCharIsAParenthesis(formulaText)
      ) {
        throw new CalcException(
          "Cannot insert an opening parenthesis at this position."
        );
      }
      return formulaText + char;
    case OPERATIONS.CLOSING_PARENTHESIS:
      if (
        isEmpty(formulaText) ||
        lastCharIsAnOperation(formulaText) ||
        lastCharIsAOpeningParenthesis(formulaText) ||
        !thereAreUnclosedParenthesis(formulaText)
      ) {
        throw new CalcException(
          "Cannot insert a closing parenthesis at this position."
        );
      }
      return formulaText + char;
    default:
      throw new CalcException("Unknown operation code: " + code);
  }
};

export const handleCommandCode = (code, formulaText) => {
  if (isEmpty(formulaText)) {
    throw new CalcException("Formula is empty.");
  } else {
    switch (code) {
      case COMMANDS.CLEAR_ELEMENT:
        const currentNumber = getCurrentNumberFromFormulaText(formulaText);
        const size = currentNumber.length;
        formulaText = formulaText.substr(0, formulaText.length - size);
        return formulaText;
      case COMMANDS.CLEAR:
        return "";
      case COMMANDS.RESULT:
        return formulaText;
      default:
        throw new CalcException("Unknown command: " + code);
    }
  }
};
