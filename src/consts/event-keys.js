import { BUTTONS } from ".";
import { CalcException } from "../exceptions";

export const ENTER = "Enter";
export const ONE = "1";
export const TWO = "2";
export const THREE = "3";
export const FOUR = "4";
export const FIVE = "5";
export const SIX = "6";
export const SEVEN = "7";
export const EIGHT = "8";
export const NINE = "9";
export const ZERO = "0";
export const POINT = ",";
export const ADDITION = "+";
export const SUBTRACTION = "-";
export const MULTIPLICATION = "*";
export const DIVISION = "/";
export const SHIFT = "Shift";
export const BACKSPACE = "Backspace";
export const OPENING_PARENTHESIS = "(";
export const CLOSING_PARENTHESIS = ")";
export const CARET = "^";

export const getEventKeyFromButtonCode = (code) => {
  switch (code) {
    case BUTTONS.CLEAR:
    case BUTTONS.CLEAR_ELEMENT:
    case BUTTONS.RESULT:
      return "";
    case BUTTONS.POINT:
      return POINT;
    case BUTTONS.ZERO:
      return ZERO;
    case BUTTONS.ONE:
      return ONE;
    case BUTTONS.TWO:
      return TWO;
    case BUTTONS.THREE:
      return THREE;
    case BUTTONS.FOUR:
      return FOUR;
    case BUTTONS.FIVE:
      return FIVE;
    case BUTTONS.SIX:
      return SIX;
    case BUTTONS.SEVEN:
      return SEVEN;
    case BUTTONS.EIGHT:
      return EIGHT;
    case BUTTONS.NINE:
      return NINE;
    case BUTTONS.ADDITION:
      return ADDITION;
    case BUTTONS.DIVISION:
      return DIVISION;
    case BUTTONS.MULTIPLICATION:
      return MULTIPLICATION;
    case BUTTONS.SUBTRACTION:
      return SUBTRACTION;
    case BUTTONS.POTENCY:
      return CARET;
    case BUTTONS.OPENING_PARENTHESIS:
      return OPENING_PARENTHESIS;
    case BUTTONS.CLOSING_PARENTHESIS:
      return CLOSING_PARENTHESIS;
    default:
      new CalcException(`Invalid code ${code}`);
  }
};
