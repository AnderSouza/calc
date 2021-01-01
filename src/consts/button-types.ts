import { CalcException } from "../exceptions";
import { Buttons } from "./buttons";

export enum ButtonTypes {
  NUMBER = 1,
  OPERATION,
  COMMAND,
}

export const getButtonTypeFromCode = (code: number) => {
  switch (code) {
    case Buttons.CLEAR:
    case Buttons.CLEAR_ELEMENT:
    case Buttons.RESULT:
      return ButtonTypes.COMMAND;
    case Buttons.POINT:
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
      return ButtonTypes.NUMBER;
    case Buttons.ADDITION:
    case Buttons.DIVISION:
    case Buttons.MULTIPLICATION:
    case Buttons.SUBTRACTION:
    case Buttons.POTENCY:
    case Buttons.OPENING_PARENTHESIS:
    case Buttons.CLOSING_PARENTHESIS:
      return ButtonTypes.OPERATION;
    default:
      throw new CalcException(`Invalid code ${code}`);
  }
};

export default { ButtonTypes, getButtonTypeFromCode };
