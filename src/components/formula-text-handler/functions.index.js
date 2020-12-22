import { BUTTONS, BUTTON_TYPES, EVENT_KEYS } from "../../consts";
import { CalcException } from "../../exceptions";

export const isNumber = (char) => {
  switch (char) {
    case EVENT_KEYS.ZERO:
    case EVENT_KEYS.ONE:
    case EVENT_KEYS.TWO:
    case EVENT_KEYS.THREE:
    case EVENT_KEYS.FOUR:
    case EVENT_KEYS.FIVE:
    case EVENT_KEYS.SIX:
    case EVENT_KEYS.SEVEN:
    case EVENT_KEYS.EIGHT:
    case EVENT_KEYS.NINE:
      return true;
    default:
      return false;
  }
};

export const isOperation = (char) => {
  switch (char) {
    case EVENT_KEYS.ADDITION:
    case EVENT_KEYS.SUBTRACTION:
    case EVENT_KEYS.MULTIPLICATION:
    case EVENT_KEYS.DIVISION:
    case EVENT_KEYS.POTENCY:
      return true;
    default:
      throw new CalcException(`Invalid char: ${char}`);
  }
};

export const isAnOpeningParenthesis = (char) =>
  char === EVENT_KEYS.OPENING_PARENTHESIS;

export const isAClosingParenthesis = (char) =>
  char === OPERATIONS.CLOSING_PARENTHESIS;

export const isPoint = (char) => char === EVENT_KEYS.POINT;

export const getLastChar = (string) => {
  if (string.length === 0) return "";
  const lastPosition = string.length - 1;
  return string.charAt(lastPosition);
};

export const isParenthesis = (char) =>
isAnOpeningParenthesis(char) || isAClosingParenthesis(char);

export const getLastNumberFromFormula = (formula) => {
  let last = "";
  if (lastCharIsAnOperation(formula)) {
    last = getLastChar(formula);
  } else {
    return last;
  }

  for (let i = formula.length - 2; i >= 0; i--) {
    const char = formula.charAt(i);
    if (isNumber(char) || isPoint(char)) {
      last = char + last;
    } else {
      return last;
    }
  }
  return last;
};

export const getCurrentNumberFromFormula = (formula) => {
  let number = "";
  for (let i = formula.length - 1; i >= 0; i--) {
    const char = formula.charAt(i);
    if (isNumber(char) || isPoint(char)) {
      number = char + number;
    } else {
      return number;
    }
  }
  return number;
};

export const alreadyHasAPoint = (number) => {
  for (let i = 0; i < number.length; i++) {
    if (number.charAt(i) === EVENT_KEYS.POINT) return true;
  }
  return false;
};

export const replaceLastChar = (text, replacement) => {
  const length = text.length - 1;
  text = text.substr(0, length);
  text += replacement;
  return text;
};

export const thereAreUnclosedParenthesis = (formulaText) => {
  let nOpenParenthesis = 0;
  let nClosParenthesis = 0;

  for (let i = 0; i < formulaText.length; i++) {
    if (formulaText.charAt(i) === EVENT_KEYS.OPENING_PARENTHESIS) {
      nOpenParenthesis++;
    }
    if (formulaText.charAt(i) === EVENT_KEYS.CLOSING_PARENTHESIS) {
      nClosParenthesis++;
    }
  }
  return nOpenParenthesis > nClosParenthesis;
};

export const getPenultimateChar = (string) => {
  if (string.length < 2) return "";
  const penultimatePosition = string.length - 2;
  return string.charAt(penultimatePosition);
};

export const lastCharIsAnOperation = (string) => {
  const char = getLastChar(string);
  return isOperation(char);
};

export const lastCharIsANumber = (string) => {
  const char = getLastChar(string);
  return isNumber(char);
};

export const lastCharIsAParenthesis = (string) => {
  const char = getLastChar(string);
  return isParenthesis(char);
};

export const lastCharIsAnOpeningParenthesis = (string) => {
  const char = getLastChar(string);
  return isAnOpeningParenthesis(char);
};

export const penultimateCharIsAnOpeningParenthesis = (string) => {
  const char = getPenultimateChar(string);
  return isAnOpeningParenthesis(char);
};

export const isEmpty = (string) => string.length === 0;

export const handleNumberCode = (code, formula) => {
  switch (code) {
    case BUTTONS.POINT:
      let number = getCurrentNumberFromFormula(formula);
      if (isEmpty(formula) || isEmpty(number) || alreadyHasAPoint(number)) {
        throw new CalcException("Invalid position for a point.");
      }
    case BUTTONS.ZERO:
    case BUTTONS.ONE:
    case BUTTONS.TWO:
    case BUTTONS.THREE:
    case BUTTONS.FOUR:
    case BUTTONS.FIVE:
    case BUTTONS.SIX:
    case BUTTONS.SEVEN:
    case BUTTONS.EIGHT:
    case BUTTONS.NINE:
      const char = EVENT_KEYS.getEventKeyFromButtonCode(code);
      return formula + char;
    default:
      throw new CalcException(`Unknown number code: ${code}`);
  }
};

export const handleOperationCode = (code, formula) => {
  const char = EVENT_KEYS.getEventKeyFromButtonCode(code);
  switch (code) {
    case BUTTONS.MULTIPLICATION:
    case BUTTONS.DIVISION:
    case BUTTONS.POTENCY:
      if (isEmpty(formula) || lastCharIsAnOpeningParenthesis(formula)) {
        throw new CalcException(
          "Cannot insert this operation at this position."
        );
      } else if (lastCharIsAnOperation(formula)) {
        if (
          formula.length === 1 ||
          penultimateCharIsAnOpeningParenthesis(formula)
        ) {
          throw new CalcException(
            "Cannot insert this operation at this position."
          );
        } else {
          formula = replaceLastChar(formula, char);
          return formula;
        }
      } else {
        return formula + char;
      }
    case BUTTONS.ADDITION:
    case BUTTONS.SUBTRACTION:
      if (lastCharIsAnOperation(formula)) {
        formula = replaceLastChar(formula, char);
        return formula;
      } else {
        return formula + char;
      }
    case BUTTONS.OPENING_PARENTHESIS:
      if (
        isEmpty(formula) ||
        lastCharIsANumber(formula) ||
        lastCharIsAParenthesis(formula)
      ) {
        throw new CalcException(
          "Cannot insert an opening parenthesis at this position."
        );
      }
      return formula + char;
    case BUTTONS.CLOSING_PARENTHESIS:
      if (
        isEmpty(formula) ||
        lastCharIsAnOperation(formula) ||
        lastCharIsAnOpeningParenthesis(formula) ||
        !thereAreUnclosedParenthesis(formula)
      ) {
        throw new CalcException(
          "Cannot insert a closing parenthesis at this position."
        );
      }
      return formula + char;
    default:
      throw new CalcException(`Unknown operation code: ${code}`);
  }
};

export const handleCommandCode = (code, formula) => {
  if (isEmpty(formula)) {
    throw new CalcException("Formula is empty.");
  } else {
    switch (code) {
      case BUTTONS.CLEAR_ELEMENT:
        const currentNumber = getCurrentNumberFromFormula(formula);
        const size = currentNumber.length;
        formula = formula.substr(0, formula.length - size);
        return formula;
      case BUTTONS.CLEAR:
        return "";
      case BUTTONS.RESULT:
        return formula;
      default:
        throw new CalcException(`Unknown command: ${code}`);
    }
  }
};
