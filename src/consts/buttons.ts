import { CalcException } from "../exceptions";
import { EventKeys } from "./event-keys";

export enum Buttons {
  ZERO = 0,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  POINT,
  CLEAR_ELEMENT,
  CLEAR,
  RESULT,
  ADDITION,
  SUBTRACTION,
  MULTIPLICATION,
  DIVISION,
  POTENCY,
  OPENING_PARENTHESIS,
  CLOSING_PARENTHESIS,
}

export const getButtonCodeFromEventKey = (key: string) => {
  switch (key) {
    case EventKeys.POINT:
      return Buttons.POINT;
    case EventKeys.ZERO:
      return Buttons.ZERO;
    case EventKeys.ONE:
      return Buttons.ONE;
    case EventKeys.TWO:
      return Buttons.TWO;
    case EventKeys.THREE:
      return Buttons.THREE;
    case EventKeys.FOUR:
      return Buttons.FOUR;
    case EventKeys.FIVE:
      return Buttons.FIVE;
    case EventKeys.SIX:
      return Buttons.SIX;
    case EventKeys.SEVEN:
      return Buttons.SEVEN;
    case EventKeys.EIGHT:
      return Buttons.EIGHT;
    case EventKeys.NINE:
      return Buttons.NINE;
    case EventKeys.ADDITION:
      return Buttons.ADDITION;
    case EventKeys.DIVISION:
      return Buttons.DIVISION;
    case EventKeys.MULTIPLICATION:
      return Buttons.MULTIPLICATION;
    case EventKeys.SUBTRACTION:
      return Buttons.SUBTRACTION;
    case EventKeys.POTENCY:
      return Buttons.POTENCY;
    case EventKeys.OPENING_PARENTHESIS:
      return Buttons.OPENING_PARENTHESIS;
    case EventKeys.CLOSING_PARENTHESIS:
      return Buttons.CLOSING_PARENTHESIS;
    default:
      throw new CalcException(`Invalid key: ${key}`);
  }
};

export default {
  Buttons,
  getButtonCodeFromEventKey,
};
