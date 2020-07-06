import {CalcException} from "../exceptions";

export const ADDITION = "ADD";
export const SUBTRACTION = "SUB";
export const MULTIPLICATION = "MUL";
export const DIVISION = "DIV";
export const POTENCY = "POW";
export const OPENING_PARENTHESIS = "OPP";
export const CLOSING_PARENTHESIS = "CLP";

export const ADDITION_CHAR = "+";
export const SUBTRACTION_CHAR = "-";
export const MULTIPLICATION_CHAR = "*";
export const DIVISION_CHAR = "/";
export const POTENCY_CHAR = "^";
export const OPENING_PARENTHESIS_CHAR = "(";
export const CLOSING_PARENTHESIS_CHAR = ")";

export const getOperationCharFromCode = (code) => {
  switch (code) {
    case ADDITION:
      return ADDITION_CHAR;
    case SUBTRACTION:
      return SUBTRACTION_CHAR;
    case MULTIPLICATION:
      return MULTIPLICATION_CHAR;
    case DIVISION:
      return DIVISION_CHAR;
    case POTENCY:
      return POTENCY_CHAR;
    case OPENING_PARENTHESIS:
      return OPENING_PARENTHESIS_CHAR;
    case CLOSING_PARENTHESIS:
      return CLOSING_PARENTHESIS_CHAR;
    default:
      throw new CalcException("Unknown operation code: "+code);
  }
};

export const getOperationCodeFromChar = (char) => {
  switch (char) {
    case ADDITION_CHAR:
      return ADDITION;
    case SUBTRACTION_CHAR:
      return SUBTRACTION;
    case MULTIPLICATION_CHAR:
      return MULTIPLICATION;
    case DIVISION_CHAR:
      return DIVISION;
    case POTENCY_CHAR:
      return POTENCY;
    case OPENING_PARENTHESIS_CHAR:
      return OPENING_PARENTHESIS;
    case CLOSING_PARENTHESIS_CHAR:
      return CLOSING_PARENTHESIS;
    default:
      throw new CalcException("Unknown operation char.");
  }
};

export default {
  ADDITION,
  SUBTRACTION,
  MULTIPLICATION,
  DIVISION,
  POTENCY,
  OPENING_PARENTHESIS,
  CLOSING_PARENTHESIS,
  ADDITION_CHAR,
  SUBTRACTION_CHAR,
  MULTIPLICATION_CHAR,
  DIVISION_CHAR,
  POTENCY_CHAR,
  OPENING_PARENTHESIS_CHAR,
  CLOSING_PARENTHESIS_CHAR,
  getOperationCharFromCode,
  getOperationCodeFromChar
};
