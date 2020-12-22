import Button from "../components/keyboard/button";
import { CalcException } from "../exceptions";
import * as BUTTONS from "./buttons";

export const NUMBER = 1;
export const OPERATION = 2;
export const COMMAND = 3;

export const getButtonTypeFromCode = (code) => {
  switch (code) {
    case BUTTONS.CLEAR:
    case BUTTONS.CLEAR_ELEMENT:
    case BUTTONS.RESULT:
      return COMMAND;
    case BUTTONS.POINT:
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
      return NUMBER;
    case BUTTONS.ADDITION:
    case BUTTONS.DIVISION:
    case BUTTONS.MULTIPLICATION:
    case BUTTONS.SUBTRACTION:
    case BUTTONS.POTENCY:
    case BUTTONS.OPENING_PARENTHESIS:
    case BUTTONS.CLOSING_PARENTHESIS:
      return OPERATION;
    default:
      throw new CalcException(`Invalid code ${code}`);
  }
};
