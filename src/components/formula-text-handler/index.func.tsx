import { Buttons, EventKeys, getEventKeyFromButtonCode } from "../../consts";
import { CalcException } from "../../exceptions";

export const charIsNumber = (char: string) => {
  switch (char) {
    case EventKeys.ZERO:
    case EventKeys.ONE:
    case EventKeys.TWO:
    case EventKeys.THREE:
    case EventKeys.FOUR:
    case EventKeys.FIVE:
    case EventKeys.SIX:
    case EventKeys.SEVEN:
    case EventKeys.EIGHT:
    case EventKeys.NINE:
      return true;
    default:
      return false;
  }
};

export const charIsAnOperator = (char: string) => {
  switch (char) {
    case EventKeys.ADDITION:
    case EventKeys.SUBTRACTION:
    case EventKeys.MULTIPLICATION:
    case EventKeys.DIVISION:
    case EventKeys.POTENCY:
      return true;
    default:
      return false;
  }
};

export const isAnOpeningParenthesis = (char: string) =>
  char === EventKeys.OPENING_PARENTHESIS;

export const isAClosingParenthesis = (char: string) =>
  char === EventKeys.CLOSING_PARENTHESIS;

export const charIsPoint = (char: string) => char === EventKeys.POINT;

export const getLastChar = (text: string) => {
  if (text.length === 0) return "";
  const lastPosition = text.length - 1;
  return text.charAt(lastPosition);
};

export const isParenthesis = (char: string) =>
  isAnOpeningParenthesis(char) || isAClosingParenthesis(char);

export const getLastNumberFromFormula = (formula: string) => {
  let last = "";
  if (lastCharIsAnOperator(formula)) {
    last = getLastChar(formula);
  } else {
    return last;
  }

  for (let i = formula.length - 2; i >= 0; i--) {
    const char = formula.charAt(i);
    if (charIsNumber(char) || charIsPoint(char)) {
      last = char + last;
    } else {
      return last;
    }
  }
  return last;
};

export const getCurrentNumberFromFormula = (formula: string) => {
  let number = "";
  for (let i = formula.length - 1; i >= 0; i--) {
    const char = formula.charAt(i);
    if (charIsNumber(char) || charIsPoint(char)) {
      number = char + number;
    } else {
      return number;
    }
  }
  return number;
};

export const alreadyHasAPoint = (number: string) => {
  for (let i = 0; i < number.length; i++) {
    if (number.charAt(i) === EventKeys.POINT) return true;
  }
  return false;
};

export const replaceLastChar = (text: string, replacement: string = "") => {
  const length = text.length - 1;
  text = text.substr(0, length);
  text += replacement;
  return text;
};

export const thereAreUnclosedParenthesis = (formulaText: string) => {
  let nOpenParenthesis = 0;
  let nClosParenthesis = 0;

  for (let i = 0; i < formulaText.length; i++) {
    if (formulaText.charAt(i) === EventKeys.OPENING_PARENTHESIS) {
      nOpenParenthesis++;
    }
    if (formulaText.charAt(i) === EventKeys.CLOSING_PARENTHESIS) {
      nClosParenthesis++;
    }
  }
  return nOpenParenthesis > nClosParenthesis;
};

export const getPenultimateChar = (text: string) => {
  if (text.length < 2) return "";
  const penultimatePosition = text.length - 2;
  return text.charAt(penultimatePosition);
};

export const lastCharIsAnOperator = (text: string) => {
  const char = getLastChar(text);
  return charIsAnOperator(char);
};

export const lastCharIsANumber = (text: string) => {
  const char = getLastChar(text);
  return charIsNumber(char);
};

export const lastCharIsAParenthesis = (text: string) => {
  const char = getLastChar(text);
  return isParenthesis(char);
};

export const lastCharIsAnOpeningParenthesis = (text: string) => {
  const char = getLastChar(text);
  return isAnOpeningParenthesis(char);
};

export const penultimateCharIsAnOpeningParenthesis = (text: string) => {
  const char = getPenultimateChar(text);
  return isAnOpeningParenthesis(char);
};

export const isEmpty = (text: string) => text.length === 0;

export const handleNumberCode = (code: number, formula: string) => {
  switch (code) {
    case Buttons.POINT:
      let number = getCurrentNumberFromFormula(formula);
      if (isEmpty(formula) || isEmpty(number) || alreadyHasAPoint(number)) {
        throw new CalcException("Invalid position for a point.");
      }
    case Buttons.ZERO:
    case Buttons.ONE:
    case Buttons.TWO:
    case Buttons.THREE:
    case Buttons.FOUR:
    case Buttons.FIVE:
    case Buttons.SIX:
    case Buttons.SEVEN:
    case Buttons.EIGHT:
    case Buttons.NINE:
      const char = getEventKeyFromButtonCode(code);
      return formula + char;
    default:
      throw new CalcException(`Unknown number code: ${code}`);
  }
};

export const handleOperationCode = (code: number, formula: string) => {
  const char = getEventKeyFromButtonCode(code);
  switch (code) {
    case Buttons.MULTIPLICATION:
    case Buttons.DIVISION:
    case Buttons.POTENCY:
      if (isEmpty(formula) || lastCharIsAnOpeningParenthesis(formula)) {
        throw new CalcException(
          "Cannot insert this operation at this position."
        );
      } else if (lastCharIsAnOperator(formula)) {
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
    case Buttons.ADDITION:
    case Buttons.SUBTRACTION:
      if (lastCharIsAnOperator(formula)) {
        formula = replaceLastChar(formula, char);
        return formula;
      } else {
        return formula + char;
      }
    case Buttons.OPENING_PARENTHESIS:
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
    case Buttons.CLOSING_PARENTHESIS:
      if (
        isEmpty(formula) ||
        lastCharIsAnOperator(formula) ||
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

export const handleCommandCode = (code: number, formula: string) => {
  if (isEmpty(formula)) {
    return "";
  } else {
    switch (code) {
      case Buttons.CLEAR_ELEMENT:
        const currentNumber = getCurrentNumberFromFormula(formula);
        const size = currentNumber.length;
        formula = formula.substr(0, formula.length - size);
        return formula;
      case Buttons.CLEAR:
        return "";
      case Buttons.RESULT:
        return formula;
      default:
        throw new CalcException(`Unknown command: ${code}`);
    }
  }
};
