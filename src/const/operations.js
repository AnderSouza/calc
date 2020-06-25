export const ADDITION = "ADD";
export const SUBTRACTION = "SUB";
export const MULTIPLICATION = "MUL";
export const DIVISION = "DIV";
export const POTENCY = "POW";
export const OPENING_PARENTHESIS = "OP";
export const CLOSING_PARENTHESIS = "CP";
export const CLEAR_ELEMENT = "CE";
export const CLEAR = "CL";
export const RESULT = "RES";

export const getOperationCodeFromCharacter = (char) => {
  switch (char) {
    case "+":
      return ADDITION;
    case "-":
      return SUBTRACTION;
    case "*":
      return MULTIPLICATION;
    case "/":
      return DIVISION;
    case "^":
      return POTENCY;
    default:
      break;
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
  CLEAR_ELEMENT,
  CLEAR,
  RESULT,
};
