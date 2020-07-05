import { CODE_TYPES, OPERATIONS, NUMBERS, COMMANDS } from "./../../consts";

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
